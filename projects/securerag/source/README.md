# SecureRAG — AI RAG Attack & Defense Lab

SecureRAG is a controlled AI Security Engineering portfolio project for building, testing, attacking, defending, and documenting a Retrieval-Augmented Generation system.

## What this project demonstrates

- FastAPI-based AI application engineering
- Chroma vector retrieval
- Hosted LLM integration through OpenRouter
- Multi-tenant document isolation
- Indirect prompt-injection testing
- RAG-poisoning scenarios
- Provenance and trust metadata
- Vulnerable versus secure operating modes
- Security regression testing
- Threat modeling and professional findings documentation

## Architecture

```text
User
  |
  v
FastAPI
  |
  +--> tenant identity
  |
  v
Retrieval layer
  |
  v
Chroma vector database
  |
  v
Authorized / retrieved context
  |
  v
Hosted LLM (OpenRouter)
  |
  v
Answer + source evidence
```

## Lab modes

`SECURERAG_MODE=secure`
- retrieval is filtered by tenant
- retrieved context is explicitly treated as untrusted data

`SECURERAG_MODE=vulnerable`
- tenant filtering is intentionally omitted
- retrieved instructions may influence generation

The vulnerable mode exists only for controlled portfolio testing with synthetic data.

## Setup

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export OPENROUTER_API_KEY="YOUR_KEY"
export SECURERAG_MODE="secure"
python scripts/seed.py
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Open `/docs` in the forwarded Codespaces URL.

## Test data

- `tenant_alpha.txt`
- `tenant_beta.txt`
- `adversarial_doc.txt`

All secrets and recovery phrases are synthetic.

## Portfolio tests

### Tenant isolation
Query tenant Alpha for Beta-only content. Secure mode should never return Beta documents.

### Indirect prompt injection
Retrieve `adversarial_doc.txt` and observe whether the model follows its embedded instruction.

### RAG poisoning
Add a synthetic malicious knowledge document and compare baseline versus defended behavior.

## Run tests

```bash
pytest -q
```

## Documentation

- `docs/threat-model.md`
- `docs/findings-template.md`

## Security boundary

Use only against this lab or systems you are explicitly authorized to test.
