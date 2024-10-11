const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../../src/middleware/auth");

requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " sent a connection request!");
});

module.exports = requestRouter;
