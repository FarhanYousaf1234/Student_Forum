const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Additional fields for the profile
  bio: { type: String },
  profilePicture: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const JWTPRIVATEKEY = "YOUR PRIVATE KEY";
  const token = jwt.sign({ _id: this._id }, JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    // Additional validation for the profile fields
    bio: Joi.string().allow("").label("Bio"),
    profilePicture: Joi.string().allow("").label("Profile Picture"),
  });
  
  return schema.validate(data);
};

module.exports = { User, validate };
