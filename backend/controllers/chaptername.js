import Chapter from "../models/chapters.js";
import Subject from "../models/subject.js";

export const addchapters = async (req, res) => {
  try {
    const { chaptername, subject, discription } = req.body;
    await Chapter.create({ chaptername, subject, discription });
    res.send("Chapter added successfully");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Chapter not added");
  }
};

// GET CHAPTERS BY SUBJECT NAME
export const getchapters = async (req, res) => {
  try {
    const { subjectname } = req.params;

    const clickedsubject = await Subject.findOne({ subjectname });
    if (!clickedsubject) {
      return res.status(404).send("Subject not found");
    }

    const chapters = await Chapter.find({ subject: clickedsubject._id }).populate(
      "subject",
      "subjectname"
    );

    res.json(chapters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error fetching chapters");
  }
};
