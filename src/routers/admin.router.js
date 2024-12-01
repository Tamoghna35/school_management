import { Router } from "express";
import {
  logOut,
  signIn,
  signUp,
  reGenerateAccessToken,
} from "../controllers/admin.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/logout").post(verifyJwt, logOut);
router.route("/reGenerateAccessToken").post(reGenerateAccessToken);

export default router;
