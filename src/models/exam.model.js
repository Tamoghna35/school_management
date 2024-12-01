import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { Class } from "./class.model.js";
import { Subject } from "./subject.model.js";

const Exam = sequelize.define(
  "Exam",
  {
    examId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Subject", // Links to Subject table
        key: "subjectId",
      },
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Class", // Links to Class table
        key: "classId",
      },
      allowNull: false,
    },
    examDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject, // Links to Subject table
        key: "subjectId",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class, // Links to Class table
        key: "classId",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

export { Exam };
