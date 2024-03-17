import mongoose, { Schema } from "mongoose";

const PublishedPostsSchema = new mongoose.Schema(
  {
    story: {
      type: String,
    },
    url: {
      type: Array,
      unique: true,
    },
    userId: {
      type: String,
      ref: "User",
    },
    ipfs: {
      type: Array,
      unique: true,
    },
    views: [{ type: String, ref: "User" }],
    likes: [{ type: String, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

export default mongoose.models.tests ||
  mongoose.model("tests", PublishedPostsSchema);
