import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../models/userModels";
import dotenv from "dotenv";
dotenv.config();

export const isAuhtenticated = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const currentSessionToken = request.cookies["AUTH_SESSION_TOKEN"];

    if (!currentSessionToken) {
      return response.status(400).json({
        message: "Please sign in",
      });
    }

    const existingUser = await getUserBySessionToken(currentSessionToken);
    if (!existingUser) {
      return response.status(403).json({
        messsage: "There is no user under this token please Login",
      });
    }

    merge(request, { identity: existingUser });

    return next();
  } catch (error) {
    return response.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const isOwner = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = request.params;
    const currentSessionToken = request.cookies["AUTH_SESSION_TOKEN"] as string;
    jwt.verify(
      currentSessionToken,
      process.env.SECRET,
      async (err, decoded) => {
        if (err) {
          return response.status(400).json({
            message: "wrong user",
          });
        }
        console.log(decoded);
        return response.json({
          decoded,
        });
      }
    );
  } catch (error) {
    return response.status(500).json({});
  }
};
