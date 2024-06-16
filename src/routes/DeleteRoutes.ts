import express from "express";
import { deleteUserController } from "../controllers/UserControllers";
import { isAuhtenticated } from "../middlewares/isAuthenticated";
import { isOwner } from "../middlewares/isAuthenticated";
const router = express.Router();

export const deleUserRoutesController = (): express.Router => {
  return router.delete(
    "/users/:id",
    isAuhtenticated,
    isOwner,
    deleteUserController
  );
};
