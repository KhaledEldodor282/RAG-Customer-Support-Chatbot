from app.AI.retriever import retrieve_documents
from app.AI.generator import generate_answer, build_prompt

def ask(question: str, top_k: int = 5):

    docs = retrieve_documents(question, top_k)

    prompt = build_prompt(question, docs)

    answer = generate_answer(prompt)

    return {
        "question": question,
        "retrieved_documents": docs,
        "answer": answer
    }
