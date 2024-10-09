const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true, //No matter how the email is given, it will be stored as lowercase
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid value for gender");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is the default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
