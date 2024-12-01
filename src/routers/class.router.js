import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { crateClass } from "../controllers/class.conroller.js";

const router = Router()
router.route("/createclass").post(verifyJwt, crateClass)

export default router;