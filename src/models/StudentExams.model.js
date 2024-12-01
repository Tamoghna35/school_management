import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

import { Student } from "./sudent.model.js";
import { Exam } from "./exam.model.js";

const StudentExam = sequelize.define("StudentExam", {
  studentExamId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: "studentId",
    },
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exam,
      key: "examId",
    },
  },
});
export { StudentExam };
