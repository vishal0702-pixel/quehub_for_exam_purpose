import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-frontend.vercel.app",
  "https://quehub-for-exam-purpose-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/user", userAuthrouter);
app.use("/year", yearrouter);
app.use("/subject", subjectroutes);
app.use("/chapter", chapterroutes);
app.use("/topics", topicsroute);
app.use("/pyq", pyqroutes);
app.use("/ai", aisupportroute);

// ---------- IMPORTANT FIX ----------
// 1️⃣ Serve static React build
const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath));

// 2️⃣ SPA catch-all route (ONLY after static)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
// -----------------------------------

// Server + DB + Redis init
const initializeConnection = async () => {
  try {
    await Promise.all([main(), redisclient.connect()]);
    console.log("✅ Database and Redis connected");

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error initializing:", err);
  }
};

initializeConnection();

export default app;
