import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const salt: string = bcrypt.genSaltSync(5);
export const passwordHashed = (password: string) =>
  bcrypt.hashSync(password, salt);

export const createToken = (
  password: string,
  email: string,
  passHashed: string
) =>
  jwt.sign(
    { email: email, password: password, hashed: passHashed },
    process.env.SECRET,
    { expiresIn: "3h" }
  );
