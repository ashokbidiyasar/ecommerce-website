import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../Controller/user_controller.js";
import express from "express";
const router = express.Router();
import { Auth_protected, Admin_protected } from "../Middleware/Auth_protected.js";

router.post("/register", registerUser);
router.get("/", Auth_protected, Admin_protected, getUsers); //Admin
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.get("/profile", Auth_protected, getUserProfile);
router.put("/profile", Auth_protected, updateUserProfile);
router.delete("/:id", Auth_protected, Admin_protected, deleteUser); //Admin
router.get("/:id", Auth_protected, Admin_protected, getUserById); //Admin
router.put("/:id", Auth_protected, Admin_protected, updateUser); //Admin

export default router;
