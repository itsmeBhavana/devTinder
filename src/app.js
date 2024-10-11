const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../src/middleware/auth");

const app = express(); // creating a new app from express

app.use(express.json());
app.use(cookieParser());

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
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = user.getJWT();

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login Successful!!!");
    } else throw new Error("Invalid Creadentials");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendconnectionrequest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " sent a connection request!");
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
