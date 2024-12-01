import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import { Class } from "./class.model.js";

const Student = sequelize.define(
    "Student",
    {
        studentId: {
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
            defaultValue: "Student",
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue:"Student"
        },
        refreshToken: {
            type: DataTypes.STRING
        },
        classId: {
            type: DataTypes.INTEGER,
            references: {
                model: Class, // Links to Class table
                key: "classId",
            },
            allowNull: true, // Can be assigned later
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
    },
    { timestamps: true }
);
export { Student };
