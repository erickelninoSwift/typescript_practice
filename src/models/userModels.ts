import mongoose from "mongoose";

export interface IUserFormat {
  username: string;
  email: string;
  authentication: { password: string; salt: string; sessionToken: string };
}

const UserSchema = new mongoose.Schema<IUserFormat>({
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
    },
    salt: {
      type: String,
      // select: false,
    },
    sessionToken: { type: String },
  },
});

export const UserModel = mongoose.model("Users", UserSchema);

//This one is supposed to got to services

export const getAllusers = () => UserModel.find({});

export const getOneUser = (userId: string) =>
  UserModel.findById({ _id: userId });

export const getUserByEmail = (email: string) =>
  UserModel.find({ email: email });

export const getUserBySessionToken = (userToken: string) => {
  return UserModel.find({ authentication: { sessionToken: userToken } });
};

export const createUser = (values: IUserFormat) => new UserModel(values);

export const deleteuserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateSpecifiUser = (id: string, values: IUserFormat) =>
  UserModel.findOneAndUpdate({ _id: id }, values);

// ======================================================
