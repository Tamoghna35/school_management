const asyncHandler = (handleFunction) => {
    return (req, res, next) => {
        Promise.resolve(handleFunction(req,res,next)).catch((error)=>next(error))
    }
}
export {asyncHandler}