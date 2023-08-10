const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  //   console.log(req.headers.authorization);

  //check header
  const authHeader = req.headers.authorization;

  //if header does not have token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  //get payload and verify id
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //another possible way to do this if you remove user at some point
    // const user=User.findById(payload.userId).select("-password")
    // req.user=user;

    //jwt for authorization only so no db check
    //just check signature and let them pass
    const { userId, name } = payload;

    //set up test User
    const testUser = userId === "64ce5631ed07f706b8d0bfc1";
    //attach the user to job routes
    req.user = { userId, name, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authMiddleware;
