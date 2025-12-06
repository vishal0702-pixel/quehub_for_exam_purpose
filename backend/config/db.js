import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  await mongoose.connect("mongodb+srv://Vishal:07022005vishal@database.zzugmbr.mongodb.net/quehub");
}

export default main;
