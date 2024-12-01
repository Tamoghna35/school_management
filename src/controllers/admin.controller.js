import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken"
import {
  isPasswordCorrect,
  saveHashedPassword,
} from "../utils/passwordChecker.js";
import { generateAccessToken, generateToken } from "../utils/tokenGeneration.js";
import { env_access } from "../config/credentials.js";

// register admin

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Required Fields are missing");
  }
  const existingAdmin = await Admin.findOne({ where: { name, email } });
  if (existingAdmin) {
    throw new ApiError(400, "Admin already existed");
  }
  const hashedPassword = await saveHashedPassword(password);


  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });
  newAdmin.password = undefined;
  if (!newAdmin) {
    throw new ApiError(400, "Error in creating admin");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newAdmin, "Admin is registered"));
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "required Fields are missing");
  }
  const existingAdmin = await Admin.findOne({ where: { email } });
  if (!existingAdmin) {
    throw new ApiError(400, "Admin is not registered");
  }

  
  const ispasswordCorrectOrNot = await isPasswordCorrect(
    password,
    existingAdmin.password
  );
  if (!ispasswordCorrectOrNot) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateToken(existingAdmin);


  existingAdmin.refreshToken = refreshToken;

  await existingAdmin.save();

  (existingAdmin.password = undefined),
    (existingAdmin.refreshToken = undefined);

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: existingAdmin,
          accessToken,
          refreshToken,
        },
        "Admin login Succesfully"
      )
    );
});
export const logOut = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  
  const admin = await Admin.findOne({ where: { userId: userId } });
  admin.refreshToken = null;
  await admin.save();
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logout Successfully "));
});

export const reGenerateAccessToken = asyncHandler(async (req, res) => {
  const incomimgToken = req.cookies.refreshToken || req.body.refreshToken
  const decodedToken = jwt.verify(incomimgToken, env_access.REFRESH_TOKEN_SECRET_KEY)
  const existingAdmin = await Admin.findOne({ where: { email: decodedToken.email } })
  
  if (!existingAdmin) {
    throw new ApiError(400, "Invalid refresh token")
  }

  if (incomimgToken !== existingAdmin.refreshToken) {
    throw new ApiError(400, "Refresh token expired")
  }
  const accessToken  = await generateAccessToken(existingAdmin)

  
  const options = {
    httpOnly: true,
    secure:true
  }
  return res.status(200)
    .cookie("accessToken", accessToken, options)

    .json(
      new ApiResponse(
        200,
        {
          accessToken,
        },
        "Access token regenerate successfully"
      )
    );
})