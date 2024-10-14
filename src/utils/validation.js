const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "photoUrl",
    "about",
    "skills",
    "age",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfileData };
