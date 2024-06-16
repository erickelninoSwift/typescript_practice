import express from "express";
import { getUserByEmail, createUser, IUserFormat } from "../models/userModels";
import { passwordHashed, salt, createToken } from "../helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export const handleLoginControllers = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { email, password } = request.body;

    if (!email || !password)
      return response.status(400).json({
        status: "Error was found : please provide email/password",
      });

    const checkuserexist = await getUserByEmail(email).select(
      "+authentication.password +authentication.sessionToken"
    );
    console.log(checkuserexist[0]);

    const comparePassword = bcrypt.compareSync(
      password,
      checkuserexist[0].authentication.password
    );

    if (!comparePassword) {
      return response.status(401).json({
        status: "failed",
        error: "Wrong password",
      });
    }

    const token = createToken(
      password,
      email,
      checkuserexist[0].authentication.password
    );

    checkuserexist[0].authentication.sessionToken = token;

    response.cookie(
      "AUTH_SESSION_TOKEN",
      checkuserexist[0].authentication.sessionToken,
      { domain: "localhost", path: "/" }
    );

    return response.status(200).json({
      status: "success",
      user: checkuserexist[0],
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
export const handleCreateuser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { email, password, username } = request.body;
    console.log(email, password, username);
    if (!email || !password || !username) {
      return response.status(401).json({
        error: "Please make sure you provide all data",
      });
    }

    const checkUserEmailExist = await getUserByEmail(email);

    console.log(checkUserEmailExist[0]);
    if (checkUserEmailExist[0]) {
      return response.status(401).json({
        error: "User with this email Already found ",
      });
    }

    const hashedpassword = passwordHashed(password);

    const userToregister: IUserFormat = {
      username: username,
      email: email,
      authentication: {
        password: hashedpassword,
        salt: salt,
        sessionToken: null,
      },
    };

    const registerMyUser = createUser(userToregister);

    await registerMyUser
      .save()
      .then(() => {
        console.log(registerMyUser);
        return response.status(200).json({
          status: "success",
          user: registerMyUser,
        });
      })
      .catch((error) =>
        console.log("There was an error in the database while saving ", error)
      );
  } catch (error) {
    console.log(error);
    return response.status(403).json({
      error: error,
    });
  }
};
