import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env_access } from "./config/credentials.js";

import AdminRouter from "./routers/admin.router.js";
import ClassRouter from "./routers/class.router.js";
import StudentRouter from "./routers/student.router.js"
import TeacherRouter from "./routers/teacher.router.js"
import SubjectRouter from "./routers/subject.router.js"
const app = express();

app.use(
  cors({
    origin: env_access.CORS_ORIGIN,
    credentials: true,
  })
),
  app.use(cookieParser()),
  app.use(express.json({ limit: "150kb" }));
app.use(express.urlencoded({ limit: "150kb", extended: true }));

app.use("/api/v1/admin", AdminRouter)
app.use("/api/v1/class", ClassRouter)
app.use("/api/v1/student", StudentRouter)
app.use("/api/v1/teacher", TeacherRouter)
app.use("/api/v1/subject", SubjectRouter)

export { app };
