import express from "express";
import { addsubject, getsubject } from "../controllers/subjectcards.js";

const subjectroutes = express.Router();

subjectroutes.post("/addsubject", addsubject);
subjectroutes.get("/:year/getsubject", getsubject);

export default subjectroutes;
