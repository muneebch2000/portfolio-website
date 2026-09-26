from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel, Field

from app.config import SECURERAG_MODE
from app.rag import ask_rag, ingest_document

app = FastAPI(
    title="SecureRAG AI Security Lab",
    version="1.0.0",
    description="Controlled RAG attack-and-defense portfolio lab.",
)


class QueryRequest(BaseModel):
    tenant_id: str = Field(min_length=1, max_length=64)
    question: str = Field(min_length=2, max_length=2000)
    top_k: int = Field(default=4, ge=1, le=10)


@app.get("/")
def root():
    return {
        "project": "SecureRAG AI Security Lab",
        "mode": SECURERAG_MODE,
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok", "mode": SECURERAG_MODE}


@app.post("/ingest")
async def ingest(
    tenant_id: str = Form(...),
    trust_level: str = Form("trusted"),
    file: UploadFile = File(...),
):
    if not file.filename or not file.filename.lower().endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only UTF-8 .txt files are supported.")

    raw = await file.read()
    if len(raw) > 2_000_000:
        raise HTTPException(status_code=413, detail="File too large for this lab.")

    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise HTTPException(status_code=400, detail="File must be UTF-8 text.") from exc

    return ingest_document(
        text=text,
        source=file.filename,
        tenant_id=tenant_id,
        trust_level=trust_level,
    )


@app.post("/query")
def query(request: QueryRequest):
    return ask_rag(
        question=request.question,
        tenant_id=request.tenant_id,
        top_k=request.top_k,
    )
