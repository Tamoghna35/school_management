import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Student } from "../models/sudent.model.js";
import { Class } from "../models/class.model.js";
import {
  isPasswordCorrect,
  saveHashedPassword,
} from "../utils/passwordChecker.js";
import { generateToken } from "../utils/tokenGeneration.js";

export const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = req.user;
  console.log("User in Student Regidtration ===>", user);

  if (!user || user.role !== "Admin") {
    throw new ApiError(
      400,
      "Access denied. Only admins can Register new Student."
    );
  }
  if (!name || !email) {
    throw new ApiError(400, "Required Fields are midding");
  }
  const existingStudent = await Student.findOne({ where: { email } });
  if (existingStudent) {
    throw new ApiError(400, "Student is already registered");
  }
  const hashedPassword = await saveHashedPassword(password);
  const newStudent = await Student.create({
    name,
    email,
    password: hashedPassword,
  });
  newStudent.password = undefined;
  if (!newStudent) {
    throw new ApiError(400, "Error while registering new user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, newStudent, "Student Registered successfully"));
});

export const logInStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "required Fields are missing");
  }

    const existingStudent = await Student.findOne({ where: { email } });
    console.log("Existing Student ===>", existingStudent);
    
  if (!existingStudent) {
    throw new ApiError(400, "Student record is not find in Database");
  }

  const ispasswordCorrectOrNot = await isPasswordCorrect(
    password,
    existingStudent.password
    );
    console.log("isPasswordCorrectOrNot in Student Controller===>", ispasswordCorrectOrNot);
    
  if (!ispasswordCorrectOrNot) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accesTokenStudent, refreshTokenStudent } =
    generateToken(existingStudent);
console.log("AccesToken in Student ===>", accesTokenStudent);
console.log("RefreshToken in Student ===>", refreshTokenStudent);

  existingStudent.refreshToken = refreshTokenStudent;
  existingStudent.save();
  existingStudent.password = undefined;
  existingStudent.refreshToken = undefined;

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accesTokenStudent, options)
    .cookie("refreshToken", refreshTokenStudent, options)
    .json(
      new ApiResponse(
        200,
        {
          user: existingStudent,
          accesTokenStudent,
          refreshTokenStudent,
        },
        "Student  login Succesfully"
      )
    );
});

export const logOutStudent = asyncHandler(async (req, res) => {
  console.log("User in Student ==>", req.user);

  const userId = req.user.userId;

  const student = await Student.findOne({ where: { userId: userId } });
  admin.refreshToken = null;
  await student.save();
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Student logout Successfully "));
});




// Add Student to a Class
export const addStudenToClass = asyncHandler(async (req, res) => {
  const { classId, name, email } = req.body

  if (!classId || !name || !email) {
    throw new ApiError(400, "Required fields missing")
  }
  const existingclass = await Class.findOne({ where: { classId } })
  if (!existingclass) {
    throw new ApiError(400, "Class is not existed")
  }
  const registeredStudenToClass = await Student.create({
    name,
    email,
    classId: existingclass.classId
  })

  return res.status(201).json(new ApiResponse(201, registeredStudenToClass, `Student is registered to class ${existingclass.className}`))
})