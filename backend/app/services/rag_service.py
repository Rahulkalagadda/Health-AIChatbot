import faiss
import numpy as np
import json

from ..config.settings import get_settings

settings = get_settings()

class RAGService:
    def __init__(self):
        # We will load the model lazily to prevent port binding timeouts on Render
        self.embedder = None
        self.index = None
        self.metadata = []

    def _load_model(self):
        if self.embedder is None:
            print("⏳ Loading RAG embedding model (fastembed BAAI/bge-small-en-v1.5)...")
            from fastembed import TextEmbedding
            # Using bge-small-en-v1.5 or sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
            # BAAI/bge-small-en-v1.5 is extremely fast and lightweight
            self.embedder = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
            print("✅ RAG model loaded.")


    def initialize_index(self, schemes_list: list):
        """
        Takes a list of schemes and creates a vector index.
        """
        self._load_model()
        print(f"📦 Indexing {len(schemes_list)} schemes for RAG search...")
        texts = [f"Name: {s['title']}, Eligibility: {s['eligibility']}, Benefits: {s['description']}" for s in schemes_list]
        
        # fastembed returns a generator, convert to list of numpy arrays
        embeddings = list(self.embedder.embed(texts))
        embeddings = np.array(embeddings)
        
        print("⚡ Embeddings generated.")
        
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings.astype('float32'))
        self.metadata = schemes_list

    def search_schemes(self, query: str, top_k: int = 3):
        self._load_model()
        if not self.index:
            return []
        
        # If query is empty, return only the first 3 schemes as default
        if not query or query.strip() == "":
            return self.metadata[:3]
        
        # Generate query embedding
        query_embedding = list(self.embedder.embed([query]))[0]
        query_embedding = np.array([query_embedding])
        
        distances, indices = self.index.search(query_embedding.astype('float32'), top_k)
        
        results = []
        # Filter out invalid indices and duplicates
        seen_indices = set()
        for i in indices[0]:
            if i != -1 and i < len(self.metadata) and i not in seen_indices:
                results.append(self.metadata[i])
                seen_indices.add(i)
        
        # If vector search yielded few results, try simple substring matching as fallback
        # This ensures specific schemes like the "Fellowship" one appear when searched
        if len(results) < top_k:
            query_lower = query.lower()
            for i, meta in enumerate(self.metadata):
                if i not in seen_indices:
                    # Check if query matches name or benefits specifically
                    if query_lower in meta['title'].lower() or query_lower in meta['description'].lower():
                        results.append(meta)
                        seen_indices.add(i)
                        if len(results) >= top_k:
                            break
                            
        return results

# Singleton instance
rag_service = RAGService()
