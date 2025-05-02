from typing import List, Dict
from embeddings import EmbeddingService

class Matcher:
    def __init__(self):
        self.embedding_service = EmbeddingService()

    def match_candidates(self, job_description: str, candidates: List[Dict[str, str]]) -> List[Dict[str, str]]:
        job_embedding = self.embedding_service.get_embeddings(job_description)
        candidate_scores = []

        for candidate in candidates:
            candidate_embedding = self.embedding_service.get_embeddings(candidate['resume'])
            score = self.calculate_similarity(job_embedding, candidate_embedding)
            candidate_scores.append((candidate, score))

        candidate_scores.sort(key=lambda x: x[1], reverse=True)
        return [candidate for candidate, score in candidate_scores]

    def calculate_similarity(self, embedding1, embedding2) -> float:
        return (embedding1 * embedding2).sum().item()
