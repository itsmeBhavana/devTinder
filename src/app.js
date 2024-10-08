const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express(); // creating a new app from express

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Gowtham",
    lastName: "Chinku",
    emailId: "gowtham@gmail.com",
    password: "bhavana@123",
  }); //creating a new instance of the user model
  try {
    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(400).send("Error sending the message:", err.message);
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
