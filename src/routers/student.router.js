import { Router } from "express";
import {
    registerStudent,
    logInStudent,
    logOutStudent
} from "../controllers/student.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registerStudent").post(verifyJwt,registerStudent);
router.route("/logInStudent").post(logInStudent);
router.route("/logOutStudent").post(verifyJwt, logOutStudent);


export default router;
