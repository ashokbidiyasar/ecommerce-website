import UserModel from "../Models/UserModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const Auth_protected = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      // JWT is malformed, expired, or signature is invalid
      res.status(401);
      throw new Error("Not authorized, token failed");
    }

    // Check if the user still exists (may have been deleted after token was issued)
    req.user = await UserModel.findOne({ _id: decoded.userId }).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user no longer exists");
    }

    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const Admin_protected = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (user && user.isAdmin === true) {
    next();
  } else {
    res.status(403); // 403 = authenticated but not authorized (not 401)
    throw new Error("Not authorized as admin");
  }
});

export { Auth_protected, Admin_protected };
