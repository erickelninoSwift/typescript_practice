import express from "express";
const router = express.Router();
import {
  handleCreateuser,
  handleLoginControllers,
} from "../controllers/authenticationControler";

export const routeAuthentication = (): express.Router => {
  router.post("/auth/register", handleCreateuser);
  return router;
};
export const routeLogin = (): express.Router => {
  router.post("/auth/login", handleLoginControllers);
  return router;
};
