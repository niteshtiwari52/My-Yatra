// Iporting model
const { userModel } = require("../models");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a user
exports.registerUsesr = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profileUrl",
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("please Enter Email & Password", 400));
  }

  const user = await userModel.findOne({ email }).select(`+password`);

  if (!user) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout USer
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// FOrgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("USer Not Found", 404));
  }

  // GEt ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `http://localhost/api/users/password/reset/${resetToken}`
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please igonre it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `My-Yatra password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

// REset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("password dooesn't match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// GEt user Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // we have to add cloudainary later

  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({
    success: true,
    users,
  });
});
// Get single user details (admin)
exports.getUsersDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update user Role --ADmin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // we have to add cloudainary later

  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// delete user  --ADmin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  // we have to remove cloudainary later
  if (!user) {
    return next(
      new ErrorHander(`user doesn't exsist with Id : ${req.params.id}`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    user,
  });
});
