import express from "express";
import { addchapters, getchapters } from "../controllers/chaptername.js";

const chapterroutes = express.Router();

chapterroutes.post("/addchapters", addchapters);
chapterroutes.get("/:subjectname/getchapters", getchapters);

export default chapterroutes;
