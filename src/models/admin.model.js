import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define(
  "Admin",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Admin'
    },
    refreshToken: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);
export { Admin };