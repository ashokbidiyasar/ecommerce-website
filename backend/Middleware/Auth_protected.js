import UserModel from "../Models/UserModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const Auth_protected = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findOne({ _id: decoded.userId }).select("-password");

      // #11 fix: user may have been deleted after token was issued
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }

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

  if (user && user.isAdmin === true) {
    next();
  } else {
    res.status(403); // 403 = authenticated but not authorized (not 401)
    throw new Error("Not authorized as admin");
  }
});

export { Auth_protected, Admin_protected };
