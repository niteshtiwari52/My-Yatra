const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login or Register ", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
