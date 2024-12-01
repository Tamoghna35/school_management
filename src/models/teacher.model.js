import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Teacher = sequelize.define(
  "Teacher",
  {
    teacherId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "Teacher",
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Teacher",
    },
    refreshToken: {
      type: DataTypes.STRING
    }

  },
  { timestamps: true }
);
export { Teacher };
