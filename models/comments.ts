import mongoose, { Schema } from "mongoose";

const CommentsSchema = new mongoose.Schema(
  {
    body: {
      type: String,
    },
    likes: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.models.Comments ||
  mongoose.model("Comments", CommentsSchema);
