const { UnauthenticatedError, BadRequestError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res, next) => {
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide valid name,email and password");
  //   // return next(err);
  //   //dont have to use next as using async-
  // }
  //Using mongoose validation
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide valid email,name and password");
  }

  const user = await User.create({ ...req.body });
  //we do hashing with pre hook in schema
  //create jwt token
  // console.log(user);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  //empty values
  if (!email || !password) {
    throw new BadRequestError("Please provide valid email and password");
  }

  //check if email matches
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //create JWT and send resp
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  registerUser,
  authenticateUser,
};
