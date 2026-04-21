import express from "express";

const app = express();

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";

dotenv.config();
app.use(express.json());
app.use(cookieParser());

/*
app.use("/hello", (req, res) => {
  res.send("Hello Everyone!");
});

// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

// This will only handle GET call to /user
app.get("/user/:userId/:name", (req, res) => {
  // console.log(req.query);

  console.log(req.params);

  res.send({ fistName: "Harsh", lastName: "Guleria" });
});

// GET Testing Call
app.get(/.*fly$/, (req, res) => {
  res.send("Matched /abc");
});

// app.get("/a/", (req, res) => {
//   res.send({name: "Harsh"});
// });

// POST
app.post("/user", (req, res) => {
  res.send(`Namaste this is a POST request!`);
});

// DELETE
app.delete("/user", (req, res) => {
  res.send(`Namaste this is a DELETE request!`);
});

GET /users => middleware chain => Request Handler

app.get("/user", [
  (req, res, next) => {
    console.log("Handling the route user 1!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 5!");
    res.send("Response!");
  },
]);

import { adminAuth, userAuth } from "./middlewares/auth.js";

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Data fetched successfully!");
});

app.get("/user/login", userAuth, (req, res, next) => {
  res.send("Data of User is fetched successfully!");
});

app.get("/user/data", (req, res) => {
  try {
    throw new Error("Some Error is Here!");
    res.send("User Data Sent!");
  } catch (err) {
    res.status(500).send("Some Error contact support team.");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong.");
  }
});

*/

// // Get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     console.log(userEmail);
//     const firstUser = await User.findOne({ emailId: userEmail });
//     if (!firstUser) {
//       res.status(400).send("User not found");
//     } else {
//       res.send(firstUser);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Feed API - GET /feed - get all the users from the database
// app.get("/feed", async (req, res) => {
//   try {
//     const allUsers = await User.find({});
//     res.send(allUsers);
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // FindById
// app.get("/user/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(400).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Delete
// app.delete("/user", async (req, res) => {
//   const userDel = req.body.id;

//   try {
//     const user = await User.findByIdAndDelete(userDel);
//     if (!user) {
//       res.status(400).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Update
// app.patch("/user/:id", async (req, res) => {
//   const userUpdate = req.params?.id;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["age", "photoUrl", "skills", "about"];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k),
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed!");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }

//     const user = await User.findByIdAndUpdate(userUpdate, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log(user);

//     if (!user) {
//       return res.status(400).send("User not found");
//     } else {
//       res.send("User update successfully!");
//     }
//   } catch (error) {
//     res.status(400).send(`UPDATE FAILED: ${error.message}`);
//   }
// });

// // Email Update
// app.patch("/userEmail", async (req, res) => {
//   const userEmail = req.body.emailId;
//   const data = req.body;

//   try {
//     const user = await User.findOneAndUpdate({ emailId: userEmail }, data, {
//       returnDocument: "before",
//     });
//     console.log(user);

//     if (!user) {
//       res.status(400).send("User not found");
//     } else {
//       res.send("User update successfully!");
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log(`Server is successfully listening on port 7777...`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!", err);
  });
