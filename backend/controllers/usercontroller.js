const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userController = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
		const SALT = 10;
		const salt = await bcrypt.genSalt(Number(SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}
const getProfile = async (req, res) => {
	const { userId } = req.params; // Get the user ID from the URL parameter
  
	try {
	  const user = await User.findById(userId).select('-password');
  
	  if (!user) {
		return res.status(404).send('User not found');
	  }
	  // Do whatever you need with the user object
	  res.send(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server Error');
	}
  };
  const updateProfile = async (req, res) => {
	const { userId } = req.params;
	const { firstName, lastName, bio, profilePicture } = req.body;
	try {
	  // Find the user by ID and update their profile information
	  const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ $set: { firstName, lastName, bio, profilePicture } },
		{ new: true } // Return the updated document
	  ).select('-password');
  
	  if (!updatedUser) {
		return res.status(404).send('User not found');
	  }
  
	  res.send(updatedUser);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server Error');
	}
  };
module.exports = { userController,getProfile,updateProfile };