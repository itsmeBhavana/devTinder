const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//Signup API
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //check if the email is present in the db
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credentials");

    //compare the password entered(password) to the password of the user in the db(user.password)
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send(user);
    } else throw new Error("Invalid Creadentials");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//logout API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!!");
});

module.exports = authRouter;
