const { postModel } = require("../models");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const posts = await postModel.find();

  if (posts.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Post Avaialable Now...",
    });
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.getPostByTitle = catchAsyncErrors(async (req, res, next) => {
  const { title } = req.params;
  const post = await postModel.findOne({
    title: title,
  });

  if (!post) {
    return next(new ErrorHander("post by title not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: post,
  });
});

exports.getPostById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findById(id);

  if (!post) {
    return next(new ErrorHander("Post by id not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: post,
  });
});

exports.createNewPost = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const newPost = await postModel.create(req.body);

  res.status(201).json({
    success: true,
    newPost,
  });
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  const { title } = req.params;
  const { data } = req.body;

  const updatedPost = await postModel.findOneAndUpdate(
    { title: title },
    { $set: { ...data } },
    { new: true }
    // { title: title }, data, { new: true, }
  );

  res.status(200).json({
    success: true,
    data: updatedPost,
  });
});

exports.updatePostById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedPostData = await postModel.findOneAndUpdate(
    { _id: id },
    { $set: { ...data } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    data: updatedPostData,
  });
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const { title } = req.params;
  const post = await postModel.deleteOne({
    title: title,
  });

  if (!post) {
    return next(new ErrorHander("Post to be deleted not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: post,
  });
});
