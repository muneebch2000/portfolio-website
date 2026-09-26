from app.rag import chunk_text


def test_chunk_text_returns_chunks():
    chunks = chunk_text("A" * 1600, chunk_size=700, overlap=100)
    assert len(chunks) >= 2
    assert all(chunks)
