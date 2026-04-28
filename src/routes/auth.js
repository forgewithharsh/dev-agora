import express from "express";

const authRouter = express.Router();

import bcrypt from "bcrypt";
import { validateSignUpData } from "../utils/validation.js";
import User from "../models/user.js";

// Signup
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation fo data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ emailId: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordValidation = await user.validatePassword(password);

    if (!passwordValidation) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
    });

    res.send("Login Successfully!");
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successfully!");
});

export default authRouter;
