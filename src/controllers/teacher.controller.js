import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { Class } from "../models/class.model.js";
import { ClassTeacher } from "../models/ClassTeacher.model.js";

export const addTeacherToCLass = asyncHandler(async (req, res) => {
  const { name, email, classId } = req.body;

  if (!classId || !name || !email) {
    throw new ApiError(400, "Required Fileds missing");
  }
    const existingClass = await Class.findOne({ where: { classId } });
    console.log("Existing Class ==>", existingClass);
    
  if (!existingClass) {
    throw new ApiError(400, "class is not present");
  }
  let teacher;
    teacher = await Teacher.findOne({ where: { email } });
    console.log("Teacher before ===>", teacher);
    
  if (!teacher) {
    teacher = await Teacher.create({
      name,
      email,
    });
  }
    console.log("Teacher after ===>", teacher);

  const teacherIsAsignedToClassOrNot = await ClassTeacher.findOne({
    where: { classId, teacherId: teacher.teacherId },
  });
    console.log("teacherIsAsignedToClassOrNot===>", teacherIsAsignedToClassOrNot);
    
  if (teacherIsAsignedToClassOrNot) {
    throw new ApiError(400, "Teacher is already assigned to this class");
  }
  const newTeacherAddForClass = await ClassTeacher.create({
    classId,
    teacherId: teacher.teacherId,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { newTeacherAddForClass, teacher },
        "Teacher is registered"
      )
    );
});
