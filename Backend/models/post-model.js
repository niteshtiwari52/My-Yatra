const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title"],
    },
    description: {
      type: String,
      required: [true, "Please provide content"],
    },
    imageFile: {
      type: String,
      required: [true, "Please provide image"],
    },
    tags: {
      type: String,
      required: [true, "Please provide tags"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", postSchema);
