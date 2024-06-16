import express from "express";

import { get, merge } from "lodash";
import { getUserBySessionToken } from "../models/userModels";

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
        messsage: "There is no message under this token",
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
