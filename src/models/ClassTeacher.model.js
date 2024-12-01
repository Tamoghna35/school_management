import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

import { Class } from "./class.model.js";
import { Teacher } from "./teacher.model.js";

const ClassTeacher = sequelize.define("ClassTeacher", {
  classTeacherId: {
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
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Teacher,
      key: "teacherId",
    },
  },
});
export { ClassTeacher };
