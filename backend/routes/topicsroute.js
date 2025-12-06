import express from "express";
import { addtopics, gettopics } from "../controllers/chaptertopics.js";

const topicsroute = express.Router();

topicsroute.post("/addtopics", addtopics);
topicsroute.get("/:chaptername/gettopics", gettopics);

export default topicsroute;
