from pathlib import Path
import pickle

import faiss
import pandas as pd


class RAGLoader:

    def __init__(self):

        self.index = None
        self.vectorizer = None
        self.svd = None
        self.qa_pairs = None

        self.loaded = False

    def load(self):

        if self.loaded:
            return

        rag_path = Path("rag_index")

        self.index = faiss.read_index(
            str(rag_path / "faiss.index")
        )

        with open(rag_path / "vectorizer.pkl", "rb") as f:
            self.vectorizer = pickle.load(f)

        with open(rag_path / "svd.pkl", "rb") as f:
            self.svd = pickle.load(f)

        self.qa_pairs = pd.read_csv(
            rag_path / "qa_pairs.csv"
        )

        self.loaded = True


rag_loader = RAGLoader()