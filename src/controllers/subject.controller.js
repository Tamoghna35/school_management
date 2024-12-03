import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { Class } from "../models/class.model.js";
import { Subject } from "../models/subject.model.js";

//  Add subject to a class against a teacher

export const SubjectforTeacherAndClass = asyncHandler(async (req, res) => {
  const { subjectName, className, teacherName } = req.body;
  if (!subjectName || !className || !teacherName) {
    throw new ApiError(400, "fields are missing");
  }

  const existedTeacher = await Teacher.findOne({ where: { teacherName } });
  if (!existedTeacher) {
    throw new ApiError(400, "Teacher is not existed");
  }

  const existedClass = await Class.findOne({ where: { className } });
  if (!existedClass) {
    throw new ApiError(400, "Class is not existed");
  }
  const existedSubject = await Subject.findOne({ where: { subjectName } });
  if (existedSubject) {
    existedSubject.classId = existedClass.classId;
    existedSubject.teacherId = existedTeacher.teaxherId;
    await existedSubject.save();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existedSubject,
          "Subject is auccessfully assigned to teacher and class"
        )
      );
  } else {
    const newly_created_Subject = await Subject.create({
      subjectName,
      classId: existedClass.classId,
      teacherId: existedTeacher.teacherId,
    });
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newly_created_Subject,
          "Class is created an asigned against class and teacher"
        )
      );
  }
});
