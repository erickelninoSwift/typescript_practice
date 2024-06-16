import express from "express";
import { getAllusers } from "../models/userModels";

export const getAllUsersController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const allUsers = await getAllusers();
    if (allUsers.length > 0) {
      return response.status(200).json(allUsers);
    }

    return response.status(200).json({
      data: "No record found",
    });
  } catch (error) {
    console.log(`Error was found ${error.message}`);
  }
};
