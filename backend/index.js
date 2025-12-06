import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from root
dotenv.config({ path: path.resolve("../.env") });

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-frontend.vercel.app",
  "https://quehub-for-exam-purpose-1.onrender.com",
  "https://quehub-for-exam-purpose-2001.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount API routes
app.use("/api/user", userAuthrouter);
app.use("/api/year", yearrouter);
app.use("/api/subject", subjectroutes);
app.use("/api/chapter", chapterroutes);
app.use("/api/topics", topicsroute);
app.use("/api/pyq", pyqroutes);
app.use("/api/ai", aisupportroute);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// SPA catch-all (must be AFTER all API routes)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).send("Not found");
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Initialize connections & start server
const initializeConnection = async () => {
  try {
    await Promise.all([
      main(),             // MongoDB
      redisclient.connect() // Redis
    ]);
    console.log("✅ Database and Redis connected");

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error initializing:", err);
  }
};

initializeConnection();

export default app;
