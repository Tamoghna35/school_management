import jwt from "jsonwebtoken";
import { env_access } from "../config/credentials.js";
export const generateAccessToken = async (existingAdmin) => {
  const accessToken = jwt.sign(
    {
      // payload
      id: existingAdmin.userId,
      name: existingAdmin.name,
      email: existingAdmin.email,
    },
    env_access.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  console.log("accessToken while regenerate===>", accessToken);
  
  return accessToken;
};
export const generateRefreshToken = async(existingAdmin) => {
  const refreshToken = jwt.sign(
    {
      email: existingAdmin.email,
    },
    env_access.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "10d",
    }
  );

  return refreshToken;
};

export const generateToken = async (existingAdmin) => {
  const accessToken = await generateAccessToken(existingAdmin);
  const refreshToken = await generateRefreshToken(existingAdmin);

  return { accessToken, refreshToken };
};
