import UserModel from "../Models/UserModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const Auth_protected = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findOne({ _id: decoded.userId }).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized,token failed");
    }
  } else {
    console.log("error in auth protected");
    throw new Error("not authorized,not token");
  }
});

const Admin_protected = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (user && user.isAdmin == true) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized,Not admin");
  }
});

export { Auth_protected, Admin_protected };
