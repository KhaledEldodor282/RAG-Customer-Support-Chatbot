from app.AI.loader import rag_loader


def encode_query(question):
       
    rag_loader.load()
    tfidf = rag_loader.vectorizer.transform([question])
    vector = rag_loader.svd.transform(tfidf)
    return vector.astype("float32")


def retrieve_documents(question, top_k=5):
    query_vector = encode_query(question)

    distances, indices = rag_loader.index.search(
        query_vector,
        top_k
    )

    retrieved = rag_loader.qa_pairs.iloc[indices[0]].copy()
    retrieved["distance"] = distances[0]

    return retrieved