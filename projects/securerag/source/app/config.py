import os

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
OPENROUTER_MODEL = "openrouter/free"
CHROMA_PATH = "./chroma_db"
COLLECTION_NAME = "securerag_documents"

SECURERAG_MODE = os.getenv("SECURERAG_MODE", "secure").lower()
DEFAULT_TOP_K = 4
CHUNK_SIZE = 700
CHUNK_OVERLAP = 100
