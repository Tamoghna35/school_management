import { sequelize } from "../db/index.js";
import { Admin } from "./admin.model.js";
import { Class } from "./class.model.js";
import { ClassSubject } from "./ClassSubjects.model.js";
import { ClassTeacher } from "./ClassTeacher.model.js";
import { Exam } from "./exam.model.js";
import { StudentExam } from "./StudentExams.model.js";
import { Subject } from "./subject.model.js";
import { Student } from "./sudent.model.js";
import { Teacher } from "./teacher.model.js";
import { TeacherSubject } from "./TeacherSubjects.model.js";

// many-to-many relationship among Class and Teacher
Teacher.belongsToMany(Class, {
  through: ClassTeacher,
  foreignKey: "teacherId",
  otherKey: "classId",
});
Class.belongsToMany(Teacher, {
  through: ClassTeacher,
  foreignKey: "classId",
  otherKey: "teacheId",
});

// // many-to-many relationship among Teacher and Subject

// Teacher.belongsToMany(Subject, {
//   through: TeacherSubject,
//   foreignKey: "teacherId",
//   otherKey: "subjectId",
// });
// Subject.belongsToMany(Teacher, {
//   through: TeacherSubject,
//   foreignKey: "subjectId",
//   otherKey: "teacherId",
// });

// one-to-many relationship among Teacher and Subject
Subject.belongsTo(Teacher, { foreignKey: "teacherId" });
Teacher.hasMany(Subject, { foreignKey: "teacherId" });


// one-to-many relationship among Student and Class
Student.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(Student, { foreignKey: "classId" });

// // many-to-many relationship among Class and Subject
// Class.belongsToMany(Subject, {
//   through: ClassSubject,
//   foreignKey: "classId",
//   otherKey: "subjectId",
// });
// Subject.belongsToMany(Class, {
//   through: ClassSubject,
//   foreignKey: "subjectId",
//   otherKey: "classId",
// });

// one-to-many between Claa and Subject
Subject.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(Subject, { foreignKey: "classId" });

// one-to-many relationship among Subject and Exam
Exam.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(Exam, { foreignKey: "subjectId" });
// one-to-many relationship among Class and Exam
Exam.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(Exam, { foreignKey: "classId" });

// Database connection
const DB_CONNECTION = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({});
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export {
  DB_CONNECTION,
  Admin,
  Class,
  ClassSubject,
  ClassTeacher,
  Exam,
  StudentExam,
  Subject,
  Student,
  Teacher,
  TeacherSubject,
};
