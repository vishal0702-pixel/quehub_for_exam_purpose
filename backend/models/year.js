import mongoose from "mongoose";

const { Schema } = mongoose;

const yearSchema = new Schema(
  {
    year: {
      type: String,
      enum: ["first_year", "second_year", "third_year", "fourth_year"],
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Year = mongoose.model("Year", yearSchema);

export default Year;
