import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async (res, userId) => {
    const payload = {
      userId: userId,
    };
  const options = {
    algorithm: "HS256",
    expiresIn: "30d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "DEVELOPMENT",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
