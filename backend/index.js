import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import main from "./config/db.js";
import redisclient from "./config/redis_db.js";

// Routes must use ES import too
import userAuthrouter from "./routes/userauth.js";
import yearrouter from "./routes/yearoption.js";
import subjectroutes from "./routes/subjectroute.js";
import chapterroutes from "./routes/chapter.js";
import topicsroute from "./routes/topicsroute.js";
import pyqroutes from "./routes/pyqroutes.js";
import aisupportroute from "./routes/aisupport.js";

// Required for __dirname in ES modules
const __dirname = path.resolve();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-frontend.vercel.app"
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount APIs
app.use("/user", userAuthrouter);
app.use("/year", yearrouter);
app.use("/subject", subjectroutes);
app.use("/chapter", chapterroutes);
app.use("/topics", topicsroute);
app.use("/pyq", pyqroutes);
app.use("/ai", aisupportroute);

// Serve frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});



const initializeConnection = async () => {
  try {
    await Promise.all([
      main(),
      redisclient.connect()
    ]);

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
