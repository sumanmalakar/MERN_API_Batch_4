import express from "express";
import { login, profile, register } from "../controllers/user.js";

const router = express.Router();

// register - /api/user/register
router.post("/register", register);

// login - /api/user/login
router.post("/login",login)

// user profile - /api/user/profile
router.get('/profile', profile)

export default router;
