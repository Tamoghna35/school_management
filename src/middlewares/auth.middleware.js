import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { env_access } from "../config/credentials.js";
import { Admin } from "../models/admin.model.js";
export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const receivedToken =
      req.cookies?.accessToken ||
          req.header("Authorization")?.replace("Bearer", "");
      console.log("Received Tooken ===>", receivedToken);
      
    if (!receivedToken) {
      throw new ApiError(404, "user is not authorized");
    }

    const decodedToken = jwt.verify(
      receivedToken,
      env_access.ACCESS_TOKEN_SECRET_KEY
      );
      console.log("Decoded Token ===>", decodedToken);
      
      const user = await Admin.findOne({ where: { email: decodedToken.email } });
      console.log("User==>", user);
      
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
