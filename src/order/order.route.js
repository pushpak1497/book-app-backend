import { Router } from "express";
import { createOrder, getOrdersByEmail } from "./order.controller.js";
const router = Router();

//create order endpoint
router.route("/").post(createOrder);
router.route("/email/:email").get(getOrdersByEmail);

export default router;
