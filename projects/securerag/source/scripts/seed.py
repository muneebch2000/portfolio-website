from pathlib import Path

from app.rag import ingest_document

ROOT = Path(__file__).resolve().parent.parent

samples = [
    ("data/tenant_alpha.txt", "tenant-alpha", "trusted"),
    ("data/tenant_beta.txt", "tenant-beta", "trusted"),
    ("data/adversarial_doc.txt", "tenant-alpha", "untrusted"),
]

for rel, tenant, trust in samples:
    path = ROOT / rel
    result = ingest_document(
        text=path.read_text(encoding="utf-8"),
        source=path.name,
        tenant_id=tenant,
        trust_level=trust,
    )
    print(result)
