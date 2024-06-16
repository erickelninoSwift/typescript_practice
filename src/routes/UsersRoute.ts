import express from "express";
import { getAllUsersController } from "../controllers/UserControllers";
import { isAuhtenticated } from "../middlewares/isAuthenticated";
const router = express.Router();
export const myAllusersRoutes = (): express.Router => {
  return router.get("/users", isAuhtenticated, getAllUsersController);
};
