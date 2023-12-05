import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
    },
    blogId: {
      type: Types.ObjectId,
      required: [true, "Blog ID is required"],
    },
    createdBy: {
      userId: {
        type: Types.ObjectId,
        required: [true, "User ID is required"],
      },
      username: {
        type: String,
        required: [true, "Username is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
