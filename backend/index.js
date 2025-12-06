import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
  path: path.resolve(process.cwd(), ".env")  // Load ROOT .env
});

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// DB & Redis
import main from "./config/db.js";
import redisclient from "./config/redis_db.js";

// Routes
import userAuthrouter from "./routes/userauth.js";
import yearrouter from "./routes/yearoption.js";
import subjectroutes from "./routes/subjectroute.js";
import chapterroutes from "./routes/chapter.js";
import topicsroute from "./routes/topicsroute.js";
import pyqroutes from "./routes/pyqroutes.js";
import aisupportroute from "./routes/aisupport.js";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ---------------------- CORS FIX ---------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-for-exam-purpose-2001.onrender.com",  // BACKEND (self)
  "https://quehub-frontend.vercel.app",                 // Your Vercel frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

/* -------------------- Core Middleware -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ------------------------ API Routes ------------------------ */
app.use("/api/user", userAuthrouter);
app.use("/api/year", yearrouter);
app.use("/api/subject", subjectroutes);
app.use("/api/chapter", chapterroutes);
app.use("/api/topics", topicsroute);
app.use("/api/pyq", pyqroutes);
app.use("/api/ai", aisupportroute);

/* ---------------- Serve Frontend Build (Vite) ---------------- */
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  // Deliver React index.html for any route except API
  if (req.path.startsWith("/api")) return res.status(404).json({ error: "API route not found" });
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ---------------------- Server Start ---------------------- */
const initialize = async () => {
  try {
    await Promise.all([
      main(),                 // MongoDB
      redisclient.connect()   // Redis
    ]);

    console.log("✅ MongoDB + Redis connected");

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

  } catch (err) {
    console.error("❌ Server initialization error:", err);
  }
};

initialize();

export default app;
