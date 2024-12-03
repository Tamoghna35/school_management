import { Router } from "express";
import {
    registerStudent,
    logInStudent,
    logOutStudent,
    addStudenToClass
} from "../controllers/student.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registerStudent").post(verifyJwt,registerStudent);
router.route("/logInStudent").post(logInStudent);
router.route("/logOutStudent").post(verifyJwt, logOutStudent);
router.route("/addStudenToClass").post(verifyJwt, addStudenToClass);


export default router;
