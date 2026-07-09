"""
RAG inference module.

Ported from rag_model.ipynb. Loads the retrieval artifacts (FAISS index,
TF-IDF vectorizer, SVD model, QA pairs) and the TinyLlama generation model
ONCE at startup, then exposes a single `ask()` function used by the API.

Expected artifacts (produced by pre_process_DT_final__1_.ipynb), placed in
a folder next to this file called `rag_index/`:
    rag_index/faiss.index
    rag_index/vectorizer.pkl
    rag_index/svd.pkl
    rag_index/qa_pairs.csv
"""

import pickle
import logging
from pathlib import Path

import faiss
import torch
import pandas as pd
from sklearn.preprocessing import normalize
from transformers import AutoTokenizer, AutoModelForCausalLM

logger = logging.getLogger("rag")

RAG_PATH = Path(__file__).parent / "rag_index"
MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

_index = None
_vectorizer = None
_svd = None
_qa_pairs = None
_tokenizer = None
_model = None


def load_components():
    """Load all retrieval + generation components into memory. Call once at startup."""
    global _index, _vectorizer, _svd, _qa_pairs, _tokenizer, _model

    if _model is not None:
        return  # already loaded

    logger.info("Loading RAG retrieval components from %s", RAG_PATH)

    _index = faiss.read_index(str(RAG_PATH / "faiss.index"))

    with open(RAG_PATH / "vectorizer.pkl", "rb") as f:
        _vectorizer = pickle.load(f)

    with open(RAG_PATH / "svd.pkl", "rb") as f:
        _svd = pickle.load(f)

    _qa_pairs = pd.read_csv(RAG_PATH / "qa_pairs.csv")
    logger.info("Knowledge base size: %d", len(_qa_pairs))

    logger.info("Loading generation model: %s", MODEL_NAME)
    _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    _model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    )
    logger.info("RAG components loaded successfully.")


def _encode_query(question: str):
    tfidf = _vectorizer.transform([question])
    vector = _svd.transform(tfidf)
    vector = normalize(vector, norm="l2")
    return vector.astype("float32")


def retrieve_documents(question: str, top_k: int = 5) -> pd.DataFrame:
    query_vector = _encode_query(question)
    scores, indices = _index.search(query_vector, top_k)

    retrieved = _qa_pairs.iloc[indices[0]].copy()
    retrieved["score"] = scores[0]
    return retrieved


def build_prompt(question: str, docs: pd.DataFrame) -> str:
    context = ""
    for _, row in docs.iterrows():
        context += f"Customer: {row['question']}\nSupport: {row['answer']}\n\n"

    return (
        f"Context:\n\n{context}\n"
        f"User Question:\n{question}\n\n"
        f"Answer as the customer support agent:\n"
    )


def generate_answer(prompt: str) -> str:
    inputs = _tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024)
    inputs = {k: v.to(_model.device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = _model.generate(
            **inputs,
            max_new_tokens=40,
            do_sample=False,
            repetition_penalty=1.1,
            pad_token_id=_tokenizer.eos_token_id,
            eos_token_id=_tokenizer.eos_token_id,
        )

    generated = outputs[0][inputs["input_ids"].shape[1]:]
    return _tokenizer.decode(generated, skip_special_tokens=True).strip()


def ask(question: str, top_k: int = 5) -> dict:
    if _model is None:
        raise RuntimeError("RAG components not loaded. Call load_components() at startup.")

    docs = retrieve_documents(question, top_k)
    prompt = build_prompt(question, docs)
    answer = generate_answer(prompt)

    return {
        "question": question,
        "answer": answer,
        "sources": docs["question"].tolist(),
    }
