import express, { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { get, identity, merge } from "lodash";
import {
  getUserBySessionToken,
  getUserByEmail,
  getOneUser,
  IUserFormat,
} from "../models/userModels";
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
        messsage: "Access Forbidden",
      });
    }

    // merge(request, { identity: existingUser });

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
    const currentSessionToken = request.cookies["AUTH_SESSION_TOKEN"];
    jwt.verify(
      currentSessionToken,
      process.env.SECRET,
      (err: Error, decoded: any) => {
        if (err) {
          return response.status(400).json({
            message: err.message,
          });
        }

        const { id: userLoggedInID } = decoded;

        console.log(userLoggedInID);
        if (userLoggedInID === id) {
          return response.status(403).send("Forbidden");
        }
        next();
      }
    );
  } catch (error) {
    return response.status(500);
  }
};
