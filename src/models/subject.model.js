import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { Class } from "./class.model.js";
import { Teacher } from "./teacher.model.js";

const Subject = sequelize.define(
  "Subject",
  {
    subjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key :"classId"
      }

    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key :"teacherId"
      }

    }
  },
  {
    timestamps: true,
  }
);

export { Subject };
