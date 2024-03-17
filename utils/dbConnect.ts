import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nirwan:nirwan@cluster0.sfkf39v.mongodb.net/user?retryWrites=true&w=majority"
    );
  } catch (error) {
    throw new Error("Error connecting to mongodb" + error);
  }
};

export default connect;
