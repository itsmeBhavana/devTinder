const express = require("express");

const app = express(); // creating a new app from express

const { adminAuth, userAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);

app.post("/user/login", userAuth, (req, res) => {
  res.send("User is logged in successfully");
});

app.get("/user/data", (req, res) => {
  try {
    throw new Error("Invalid data");
    res.send("User data sent");
  } catch (err) {
    res.status(500).send("Contact Support!!");
  }
});

app.get("/admin/data", (req, res) => {
  res.send("All the admin data sent");
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("Error needs to be handled");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on Port 7777...");
}); //callback function is executed when the server is up and running
