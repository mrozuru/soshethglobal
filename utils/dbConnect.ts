import mongoose from "mongoose";

const mongodb = process.env.MONGODB_URI || '';

const connect = async () => {
  try {
    await mongoose.connect(
      mongodb
      , { 
        dbName: 'SoSH', 
    });
  } catch (error) {
    throw new Error("Error connecting to mongodb" + error);
  }
};

export default connect;
