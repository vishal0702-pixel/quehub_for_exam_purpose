import express from "express";
import solvedoubt from "../controllers/solvedoubt.js";
import usermiddleware from "../middleware/usermiddleware.js";

const aisupportroute = express.Router();

aisupportroute.post("/chat", usermiddleware, solvedoubt);

export default aisupportroute;
