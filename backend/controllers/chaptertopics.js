import Topics from "../models/topic.js";
import Chapter from "../models/chapters.js";

export const addtopics = async (req, res) => {
  try {
    const { topicname, chapter, notes, description, videos } = req.body;

    await Topics.create({ topicname, chapter, notes, description, videos });

    res.send("Added successfully");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Not added");
  }
};

export const gettopics = async (req, res) => {
  try {
    const { chaptername } = req.params;

    const findchapter = await Chapter.findOne({ chaptername });
    if (!findchapter) {
      return res.status(404).send("Chapter not found");
    }

    const findtopics = await Topics.find({ chapter: findchapter._id }).populate(
      "chapter",
      "chaptername"
    );

    res.json(findtopics);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Can't fetch topics");
  }
};
