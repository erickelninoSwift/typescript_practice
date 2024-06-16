import express from "express";
import { getAllusers, deleteuserById } from "../models/userModels";

export const getAllUsersController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const allUsers = await getAllusers();
    if (allUsers) {
      return response.status(200).json({
        status: "success",
        data: allUsers,
      });
    }

    return response.status(200).json({
      data: "No record found",
    });
  } catch (error) {
    console.log(`Error was found ${error.message}`);
  }
};

export const deleteUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;

    const deleteuser = await deleteuserById(id);
    return response.status(200).json({
      delete: "success",
      deleteuser,
    });
  } catch (error) {
    return response.status(500).json({
      success: "false",
      message: error.messsage,
    });
  }
};
