import faiss
import numpy as np
import json
from sentence_transformers import SentenceTransformer
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
            print("⏳ Loading RAG embedding model (multilingual)... this may take a moment.")
            from sentence_transformers import SentenceTransformer
            self.embedder = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
            print("✅ RAG model loaded.")


    def initialize_index(self, schemes_list: list):
        """
        Takes a list of schemes and creates a vector index.
        """
        self._load_model()
        texts = [f"Name: {s['title']}, Eligibility: {s['eligibility']}, Benefits: {s['description']}" for s in schemes_list]
        embeddings = self.embedder.encode(texts)
        
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(np.array(embeddings).astype('float32'))
        self.metadata = schemes_list

    def search_schemes(self, query: str, top_k: int = 3):
        self._load_model()
        if not self.index:
            return []
        
        # If query is empty, return only the first 3 schemes as default
        if not query or query.strip() == "":
            return self.metadata[:3]
        
        query_embedding = self.embedder.encode([query])
        distances, indices = self.index.search(np.array(query_embedding).astype('float32'), top_k)
        
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
