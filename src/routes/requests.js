const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../../src/middleware/auth");
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //check1: to check if no other status messgaes are send
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: `Invalid status type ${status}`,
        });
      }

      //check2: To check if the request already exist
      //$or is used for adding ,multiple conditions with OR condition
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //If there is an existing connectionRequest to the user
          { fromUserId: toUserId, toUserId: fromUserId }, //If there is user has sent a connection request already
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request already exist!!" });
      }

      //check3: to check if the user to which request is sent exist in the db
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found!!",
        });
      }

      //check4: to check if the user is sending the request to himself
      //can be done here also. But, for learning purposes executed at schema level

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      //validate the user
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error({ message: `Status not allowed!` });
      }

      //check if the requestId is actually present and
      //the request is actually to you and the status HAS to be interested in this case
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: `Connection request not found` });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: `Connection request ${status}`, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
