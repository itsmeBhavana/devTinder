const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express(); // creating a new app from express

app.use(express.json());

//Signup API
app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignupData(req);
    //Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); //creating a new instance of the user model

    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

//login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //check if the email is present in the db
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credentials");

    //compare the password entered(password) to the password of the user in the db(user.password)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) res.send("Login Successful!!!");
    else throw new Error("Invalid Creadentials");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
