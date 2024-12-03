import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addTeacherToCLass } from "../controllers/teacher.controller.js";

const router = Router()
router.route("/addTeacherToCLass").post(verifyJwt, addTeacherToCLass)

export default router;