import { connect } from "mongoose";

export const mongoConnect = async () => {
  try {
    await connect(
      "mongodb+srv://hadialachkar:@PinkFloyd94@cluster1.sfqs2nj.mongodb.net/"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
