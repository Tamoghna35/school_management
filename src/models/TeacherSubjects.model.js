import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { Teacher } from "./teacher.model.js";
import { Subject } from "./subject.model.js";

const TeacherSubject = sequelize.define("TeacherSubject", {
  teacherSubjectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  teaherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Teacher,
      key: "teacherId",
    },
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subject,
      key: "subjectId",
    },
  },
});
export { TeacherSubject };
