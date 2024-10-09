const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express(); // creating a new app from express

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body); //creating a new instance of the user model
  try {
    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(400).send("Error sending the message:", err.message);
  }
});

//Get User by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    users.length === 0
      ? res.status(404).send("User not found")
      : res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//delete a user from the db
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "skills",
      "age",
      "gender",
      "userId",
      "photoUrl",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const updatedData = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    console.log(updatedData);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

//Feed API - Get all the users in the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    users.length === 0
      ? res.status(404).send("No users found")
      : res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on Port 7777...");
    }); //callback function is executed when the server is up and running
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
