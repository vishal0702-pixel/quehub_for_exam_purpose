import express from "express";
import { addpyq, getpyq } from "../controllers/subjectpyq.js";

const pyqroutes = express.Router();

pyqroutes.post("/addpyq", addpyq);
pyqroutes.get("/:subjectname/getpyq", getpyq);

export default pyqroutes;
