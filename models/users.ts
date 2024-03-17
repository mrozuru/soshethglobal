import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  linkedAccounts: {
    type: Array,
    unique: true,
  },
  username: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
