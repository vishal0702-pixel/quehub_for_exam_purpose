import Subject from "../models/subject.js";
import Year from "../models/year.js";

export const addsubject = async (req, res) => {
  try {
    console.log(req.body);
    const { subjectname, year } = req.body;

    if (!subjectname || !year) {
      return res.status(400).send("Invalid subject name or year ID");
    }

    const newSubject = await Subject.create({ subjectname, year });

    res.status(201).json({ message: "Subject added successfully", newSubject });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error");
  }
};

export const getsubject = async (req, res) => {
  try {
    const { year } = req.params;

    const acdemicyear = await Year.findOne({ year });
    if (!acdemicyear) {
      return res.status(404).send("Academic year not found");
    }

    const subjects = await Subject.find({ year: acdemicyear._id }).populate(
      "year",
      "year"
    );

    res.json(subjects);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Subjects not found");
  }
};
