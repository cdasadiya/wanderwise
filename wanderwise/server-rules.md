# WanderWise Server Rules

- **Tech Stack**: Node.js + Express. Keep npm dependencies to a minimum (use `express`, `cors`, `dotenv`).
- **Response Format**:
  - Every API response must match this schema:
    ```json
    {
      "success": true,
      "message": "Detailed message",
      "data": {}
    }
    ```
- **Endpoints**:
  - `GET /api/health`: Healthcheck, returns `{ "success": true, "message": "Tara is ready to explore!" }`.
  - `GET /api/destinations`: List of 16 curated Indian destinations.
  - `POST /api/chat`: Streams Tara's chatbot response line-by-line as Newline-Delimited JSON (NDJSON).
- **Environment & Secrets**:
  - API keys and port configurations must reside in `.env`.
  - Load using `dotenv.config({ path: path.join(__dirname, '.env') })` to make the path environment-independent.
  - Commit `.env.example`, but gitignore `.env`.
- **Streaming Implementation**:
  - Communicate with Gemini 2.5 Flash Lite REST endpoint via streaming chunks.
  - Standardize CRLF (`\r\n\r\n`) to LF (`\n\n`) when processing Server-Sent Events (SSE).
  - Stream chunks to the client as soon as they are parsed from Gemini.
