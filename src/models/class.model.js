import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Class = sequelize.define(
  "Class",
  {
    classId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export { Class };
