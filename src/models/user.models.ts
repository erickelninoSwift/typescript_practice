import mongoose from "mongoose";

export interface UserFormat {
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


//This one is supposed to got to services

export const getAllusers = () => UserModel.find({});

export  const getOneUser = (userId : string) => UserModel.findById({_id : userId})

export  const getUserByEmail = (email: string) => UserModel.findOne({email})

export  const getUserBySessionToken = (userToken: string) => UserModel.findOne({'authentication.sessionToken': userToken})



export  const createUser = (values : UserFormat) => new UserModel(values).save().then(() => console.log('User was saved with success')).catch(error =>{
  console.log(`Error was found while saveing user ${error.message}`)
})


export  const deleteuserById = (id : string) => UserModel.findOneAndDelete({id});

export  const updateSpecifiUser = (id : string , values: UserFormat) => UserModel.findOneAndUpdate({_id : id}, values);

// ======================================================

