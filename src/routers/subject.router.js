import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { SubjectforTeacherAndClass } from "../controllers/subject.controller.js";

const router = Router()
router.route("/SubjectforTeacherAndClass").post(SubjectforTeacherAndClass)

export default router;