// backend/index.js
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Database & Redis
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

// Load .env from root (one level above backend)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-frontend.vercel.app",
  "https://quehub-for-exam-purpose-1.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes (prefix with /api to avoid SPA conflicts)
app.use("/api/user", userAuthrouter);
app.use("/api/year", yearrouter);
app.use("/api/subject", subjectroutes);
app.use("/api/chapter", chapterroutes);
app.use("/api/topics", topicsroute);
app.use("/api/pyq", pyqroutes);
app.use("/api/ai", aisupportroute);

// Serve frontend static files using process.cwd()
const frontendPath = path.join(process.cwd(), "frontend", "dist");
app.use(express.static(frontendPath));

// SPA fallback route (any route not starting with /api)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Initialize DB & Redis connections, then start server
const initializeConnection = async () => {
  try {
    await Promise.all([
      main(),            // MongoDB connection
      redisclient.connect() // Redis connection
    ]);

    console.log("✅ Database and Redis connected");

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error initializing:", err);
    process.exit(1); // Exit if DB or Redis fails
  }
};

initializeConnection();

export default app;
