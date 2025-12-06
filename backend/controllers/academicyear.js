import Year from "../models/year.js";

export const yearAdding = async (req, res) => {
  try {
    const { year } = req.body;
    if (!year) return res.status(400).send("year_name is required");

    const addYear = await Year.create({ year });
    res.status(201).send(addYear);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Year not added");
  }
};

export const yearchoice = async (req, res) => {
  try {
    const result = await Year.find({}).sort({ year: 1 });
    if (!result) {
      return res.status(404).send("Year not found");
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error found");
  }
};
