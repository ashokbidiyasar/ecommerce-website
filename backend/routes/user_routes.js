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
import {
  Auth_protected,
  Admin_protected,
} from "../Middleware/Auth_protected.js";

// Public routes
router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

// Profile routes
router.get("/profile", Auth_protected, getUserProfile);
router.put("/profile", Auth_protected, updateUserProfile);

// Admin routes
router.get("/users", Auth_protected, Admin_protected, getUsers);
router.get("/:id", Auth_protected, Admin_protected, getUserById);
router.delete("/:id", Auth_protected, Admin_protected, deleteUser);
router.put("/:id", Auth_protected, Admin_protected, updateUser);

export default router;
