import os

os.environ["SECURERAG_MODE"] = "secure"

from app.rag import ingest_document, retrieve


def test_secure_mode_filters_by_tenant():
    ingest_document(
        "Synthetic alpha-only record: ALPHA-ONLY.",
        "alpha_test.txt",
        "tenant-alpha",
    )
    ingest_document(
        "Synthetic beta-only record: BETA-ONLY.",
        "beta_test.txt",
        "tenant-beta",
    )

    results = retrieve("beta-only record", tenant_id="tenant-alpha", top_k=10)

    assert all(item["tenant_id"] == "tenant-alpha" for item in results)
