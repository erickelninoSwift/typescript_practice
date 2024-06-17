import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const salt: string = bcrypt.genSaltSync(5);
export const passwordHashed = (password: string) =>
  bcrypt.hashSync(password, salt);

export const createToken = (id: string, email: string) =>
  jwt.sign({ id: id, email: email }, process.env.SECRET, { expiresIn: "3h" });
