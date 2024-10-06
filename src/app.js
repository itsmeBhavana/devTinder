const express = require("express");

const app = express(); // creating a new app from express

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello from Bhavana!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
}); //this calback function is called Request handler

app.listen(7777, () => {
  console.log("Server is successfully listening on Port 7777...");
}); //callback function is executed when the server is up and running
