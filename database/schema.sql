-- PostgreSQL (opcional, solo si usas Docker).
-- Para SQL Server use database/schema-sqlserver.sql

CREATE TABLE IF NOT EXISTS app_state (
  id INTEGER PRIMARY KEY DEFAULT 1,
  CONSTRAINT app_state_single_row CHECK (id = 1),
  datos JSONB NOT NULL DEFAULT '{}'::jsonb,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO app_state (id, datos)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;
