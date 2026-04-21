import express from "express";

const profileRouter = express.Router();

import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData } from "../utils/validation.js";

// Profile View
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

// Profile Edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

export default profileRouter;
