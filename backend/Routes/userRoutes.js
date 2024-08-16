import express from "express";
import {
  authUsers,
  getUserPofile,
  registerUser,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../Controllers/userController.js";
import { admin, protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUsers);
router
  .route("/profile")
  .get(protect, getUserPofile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser).get(protect, admin, getUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
