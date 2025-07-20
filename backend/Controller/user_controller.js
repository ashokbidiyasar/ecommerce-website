import asyncHandler from "../Middleware/asyncHandler.js";
import UserModel from "../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import { configDotenv } from "dotenv";
configDotenv();

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      userId: user._id,
      email: user.email,
      Admin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = UserModel.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  req.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date.now(0),
  });

  res.status(200).json({ message: "logout Successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("getUserProfile in  user");
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if(user){
     user.name = req.body.name || user.name;
     user.email = req.body.email || user.email;

     if (req.body.password) {
       user.password = req.body.password;
     }

     const updatedUser = await user.save();

     res.json({
       _id: updatedUser._id,
       name: updatedUser.name,
       email: updatedUser.email,
       isAdmin: updatedUser.isAdmin,
     });
    
  }else{
    res.status(404);
    throw new Error("User not found")
  }
});

const getUsers = asyncHandler(async (req, res) => {
  res.send("getUsers admin");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("deleteUser in admin");
});

const getUserById = asyncHandler(async (req, res) => {
  res.send("getUsersByID in admin");
});

const updateUser = asyncHandler(async (req, res) => {
  res.send("updateUser in admin user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
