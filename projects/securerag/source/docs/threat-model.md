# SecureRAG Threat Model

## Assets
- Tenant-scoped documents
- User questions
- Retrieved context
- Hosted-model responses
- Security event logs

## Trust boundaries
1. User -> API
2. API -> retrieval layer
3. Retrieval layer -> vector store
4. Vector store -> untrusted retrieved content
5. Application -> hosted model

## Primary threats
- Cross-tenant retrieval
- Indirect prompt injection
- RAG poisoning
- Sensitive information disclosure
- Weak provenance
- Missing auditability

## Controls
- Tenant filtering before model invocation
- Treat retrieved content as data, not instructions
- Provenance metadata
- Trust labels
- Synthetic-data-only adversarial tests
- Regression tests for authorization boundaries
