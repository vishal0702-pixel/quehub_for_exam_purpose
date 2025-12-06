import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisclient = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-19039.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 19039,
    tls: {}, // REQUIRED for Redis Cloud
  },
});

redisclient.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redisclient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redisclient;
