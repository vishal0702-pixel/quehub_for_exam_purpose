import express from "express";
import usermiddleware from "../middleware/usermiddleware.js";
import { register, login, logout } from "../controllers/usereAuthentic.js";
import isEmail from "validator/lib/isEmail.js";

const userAuthrouter = express.Router();

// Register
userAuthrouter.post("/register", register);

// Login
userAuthrouter.post("/login", login);

// Logout
userAuthrouter.post("/logout", usermiddleware, logout);

// Check user authentication
userAuthrouter.get("/check", usermiddleware, (req, res) => {
  const reply = {
    firstname: req.result.firstname,
    emailID: req.result.emailID,
    id: req.result._id,
  };

  res.json({
    user: reply,
    message: "Checked user successfully",
  });
});

// Future: Get profile route (uncomment and fix path when implemented)
// userAuthrouter.get("/getprofile", getprofile);

export default userAuthrouter;
