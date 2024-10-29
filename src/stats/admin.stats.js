import { Router } from "express";
import { getAdminData } from "./admin.controller.js";

const router = Router();
router.route("/").get(getAdminData);

export default router;
