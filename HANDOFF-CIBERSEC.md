# 🛡️ SECURITY ANOMALY DETECTOR — Project Blueprint & Handoff

This document details the complete design, architectural pattern, database choices, and real-time ingestion rules for the **Security Anomaly Detector**. 

As part of our modular approach, this project will live in its own dedicated repository, leaving the portfolio strictly as a lightweight showcase ("vitrina") pointing to this external service.

---

## 🎯 Project Vision

An autonomous, machine-learning-assisted security information analyzer designed to flag suspicious networking behavior and parse incoming system logs in real-time. By combining lightweight clustering, vector embeddings, and fallback deterministic security rules, it provides security teams with an actionable alerting interface without relying on rigid, easily bypassed hardcoded heuristics.

---

## 🏗️ System Architecture

```
                                  [ REAL-TIME LOG INGESTION ]
                                (Syslogs, Sysmon, PCAP, Auth Logs)
                                                │
                                                ▼
                                    [ LOG INGESTION PIPE ]
                              (FastAPI Router / Stream Consumer)
                                                │
                                                ▼
                                  [ REAL-TIME PARSING LAYER ]
                               (Regex Extractors + Schema Normalizer)
                                                │
                       ┌────────────────────────┴────────────────────────┐
                       ▼                                                 ▼
             [ MACHINE LEARNING LAYER ]                      [ DETERMINISTIC RULES ENGINE ]
           (Log-BERT Embeddings / DBSCAN)                     (Sigma Rules / Network Alerts)
                       │                                                 │
                       └────────────────────────┬────────────────────────┘
                                                ▼
                                    [ DETECTOR CORE & CACHE ]
                                  (Pattern match, State Engine)
                                                │
                                                ▼
                                   [ ALERTING & UI SERVICE ]
                             (FastAPI + WebSockets ──► React Panel)
```

---

## 🛠️ Stack & Technologies

- **Backend Framework:** FastAPI (Python 3.11+) for high-throughput asynchronous log parsing and lightweight websocket telemetry.
- **Data Ingestion & Streaming:** 
  - **Local/Development:** Python `asyncio` Queue + asynchronous file tailers (simulating syslog streaming).
  - **Production:** Redis Pub/Sub or Apache Kafka for buffering high-frequency security inputs.
- **Data Store & Vector Analytics:**
  - **Relational / State Store:** SQLite (highly optimized with WAL mode enabled) to persist alerts, normalized incidents, and system configs.
  - **Clustering / Embeddings DB:** ChromaDB or pgvector (if hosted) to store semantic embeddings of security anomalies, allowing quick clustering and comparison of novel attack patterns.
- **Machine Learning & AI Engine:**
  - **Local Models:** Hugging Face `transformers` (e.g., a lightweight `Log-BERT` model or a custom SentenceTransformer fine-tuned on security logs) running locally via **Ollama** or PyTorch CPU.
  - **Clustering:** Scikit-Learn (DBSCAN/Isolation Forest) for grouping log parameters and uncovering anomalous vectors without supervised labels.
- **Frontend Dashboard:** Next.js / Tailwind CSS terminal UI, streaming raw telemetry using WebSockets with lightweight visual alert indicators (using canvas/WebGL for flow density representations).

---

## 💾 Database Schema

### SQLite Core (Incidents & System State)
We'll utilize SQLite's Write-Ahead Log (WAL) and memory optimization settings for maximum indexing speed:

```sql
-- Normalization of parsed system events
CREATE TABLE IF NOT EXISTS security_events (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_ip TEXT,
    destination_ip TEXT,
    port_destination INTEGER,
    protocol TEXT, -- TCP, UDP, ICMP, DNS
    event_type TEXT, -- auth_failure, network_flow, process_creation
    payload TEXT, -- Raw unparsed syslog payload
    severity TEXT, -- INFO, WARNING, CRITICAL
    analyzed BOOLEAN DEFAULT FALSE
);

-- Active Alerts surfaced by ML/Rules engine
CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    event_id TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detection_source TEXT, -- 'ML_CLUSTERING', 'DETERMINISTIC_SIGMA'
    confidence REAL, -- Score between 0.00 and 1.00
    description TEXT,
    status TEXT DEFAULT 'OPEN', -- 'OPEN', 'UNDER_INVESTIGATION', 'RESOLVED'
    FOREIGN KEY(event_id) REFERENCES security_events(id)
);
```

---

## 🛡️ Detection & Ingestion Flow Rules

### Phase 1: Real-time Ingest (Streaming)
1. **Log Normalizer:** Incoming syslog/PCAP lines are extracted into a standard JSON schema containing `source`, `destination`, `payload`, and `event_type`.
2. **Buffer:** Logs are queued. An async parser consumes the queue to prevent database lockups under log spikes.

### Phase 2: Dual-Pass Analysis
#### Pass A: Deterministic Rules (Fast-Path)
- Compares logs against a localized translation of **Sigma Rules** (e.g., checking for multiple failed login attempts from a single IP, unexpected outbound connection to port 4444, or unauthorized binary executions like `whoami` under process accounts).
- If matched, directly registers a **High Severity Alert** in the `alerts` table.

#### Pass B: Unsupervised Machine Learning (Deep-Path)
- **Vector Embeddings:** The text payload is converted into a 384-dimensional dense vector using a local embedding model.
- **Distance Comparison:** The vector is compared against historically "safe" log patterns.
- **Anomalous Clustering:** If DBSCAN or Isolation Forest identifies the log vector as a peripheral outlier (high cosine distance from standard log clusters), it flags it.
- **Surfacing:** It issues an alert tagged with `ML_CLUSTERING`, noting a "Novel/Unknown attack vector pattern detected".

### Phase 3: Telemetry Stream
- All registered alerts are immediately serialized and pushed over WebSockets to the active React dashboard, showing real-time network traffic nodes lighting up red upon attack detection.

---

## 🚀 Execution & Implementation Plan

### Step 1: Ingestion Mock Script
Write a python utility (`log_generator.py`) that simulates system workloads, mixed with realistic intrusion patterns (SQL injections, SSH brute forcing, port scanning, and shell spawning).

### Step 2: FastAPI Setup
Configure FastAPI routers with async endpoints to receive raw syslog payloads, normalizes them, and passes them to a background worker.

### Step 3: Embeddings & Isolation Forest Integration
Draft `ml_detector.py` implementing SentenceTransformers to vectorize inputs and Isolation Forest to assign anomaly scores.

### Step 4: WebSockets & UI
Assemble a dark, futuristic dashboard featuring high-contrast terminal grids to monitor live telemetry logs and alert triage panels.
