// server.js
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend JS requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing url param");

  try {
    const response = await fetch(targetUrl);

    // Copy headers except restrictive ones
    for (const [key, value] of response.headers.entries()) {
      if (
        !["x-frame-options", "content-security-policy"].includes(
          key.toLowerCase()
        )
      ) {
        res.setHeader(key, value);
      }
    }

    res.status(response.status);
    Readable.from(response.body).pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy request failed");
  }
});

// Fallback route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Clxak running on http://localhost:${PORT}`);
});
