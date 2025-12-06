import express from "express";
import { yearAdding, yearchoice } from "../controllers/academicyear.js";

const yearrouter = express.Router();

yearrouter.post("/addyear", yearAdding);
yearrouter.get("/", yearchoice);

export default yearrouter;
