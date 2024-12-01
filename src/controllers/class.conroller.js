import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Admin } from "../models/admin.model.js";
import { Class } from "../models/class.model.js";

// create new class by Admin

export const crateClass = asyncHandler(async (req, res) => {
    const { className } = req.body
    const user = req.user;
    console.log("User in class controller ===>", user);
    if (!user || user.role !== "Admin") {
        throw new ApiError(403, "Access denied. Only admins can create a class.");
    }
    
    if (!className) {
        throw new ApiError(400, "Required fields is missing")
    }
    const exiatingClass = await Class.findOne({where:{className}})
    if (exiatingClass) {
        throw new ApiError(400,"class with same name is already existed")
    }
    const newClass = await Class.create({ className })
    
    return res.status(201)
    .json(new ApiResponse(201, newClass,"class Created sucessfully"))
})