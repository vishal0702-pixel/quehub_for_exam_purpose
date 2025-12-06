import PYQ from "../models/pyq.js";
import Subject from "../models/subject.js";

export const addpyq = async (req, res) => {
  try {
    const { subject, files } = req.body;

    if (!subject || !files || !files.length) {
      return res.status(400).send("Subject and files are required");
    }

    await PYQ.create({ subject, files });

    res.send("File added successfully");
  } catch (err) {
    console.error("Error in addpyq:", err);
    res.status(500).send("Not added");
  }
};

export const getpyq = async (req, res) => {
  try {
    const { subjectname } = req.params;

    const findsubject = await Subject.findOne({ subjectname });
    if (!findsubject) {
      return res.status(404).send("Subject not found");
    }

    const findpyqfile = await PYQ.find({ subject: findsubject._id }).populate(
      "subject",
      "subjectname"
    );

    res.json(findpyqfile);
  } catch (err) {
    console.error("Error in getpyq:", err);
    res.status(500).send("Can't fetch");
  }
};
