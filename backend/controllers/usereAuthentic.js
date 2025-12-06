import User from "../models/users.js";
import validate from "../utils/valitor.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermiddleware from "../middleware/usermiddleware.js";
import redisclient from "../config/redis_db.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    // Validate request body
    validate(req.body);

    const { firstname, password, emailID } = req.body;

    // Hash the password
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";

    const user = await User.create(req.body);

    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, emailID, role: "user" },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: 60 * 60 }
    );

    const result = {
      firstname: user.firstname,
      emailID: user.emailID,
      id: user._id,
      password: user.password,
    };

    res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(201).json({
      user: result,
      message: "Registered successfully",
    });

    console.log("Incoming data:", req.body);
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(400).send("Error: " + error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;

    if (!emailID || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ emailID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, emailID: user.emailID, role: user.role },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });

    const result = {
      firstname: user.firstname,
      emailID: user.emailID,
      id: user._id,
    };

    return res.status(200).json({
      user: result,
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(400).send("No token found");

    const payload = jwt.decode(token);

    // Block token in Redis until it expires
    await redisclient.set(`token:${token}`, "blocked");
    await redisclient.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
    res.send("Logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).send("Error logging out");
  }
};
