import { Router } from "express";
import { loginUser } from "./user.controller.js";

const router = Router();

router.route("/admin").post(loginUser);

export default router;
