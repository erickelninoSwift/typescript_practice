import mongoose from "mongoose";

interface UserFormat {
  username: string;
  email: string;
  authentication: { password: string; salt: string; sessionToken: string };
}

const UserSchema = new mongoose.Schema<UserFormat>({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("Users", UserSchema);
