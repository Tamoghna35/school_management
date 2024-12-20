import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { crateClass } from "../controllers/class.controller.js";

const router = Router()
router.route("/createclass").post(verifyJwt, crateClass)

export default router;