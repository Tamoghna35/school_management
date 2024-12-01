import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { Subject } from "./subject.model.js";
import { Class } from "./class.model.js";

const ClassSubject = sequelize.define("ClassSubject", {
  classSubjectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Class,
      key: "classId",
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
export { ClassSubject };
