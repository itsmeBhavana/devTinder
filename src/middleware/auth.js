const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    //validate the token
    const decodedObj = await jwt.verify(token, "Bhavana@123");

    //find the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch(err) {
    res.status(404).send("ERRORss: " + err.message);
  }
  // Read the token from the req cookies
};

module.exports = { userAuth };
