import express from "express";
const { routeAuthentication, routeLogin } = require("./Authentication");
import { myAllusersRoutes } from "./UsersRoute";
import { deleUserRoutesController } from "./DeleteRoutes";
export const registerRoute = (): express.Router => {
  return routeAuthentication();
};
export const loginRoute = (): express.Router => {
  return routeLogin();
};

export const AlluserControllerRoutes = (): express.Router => {
  return myAllusersRoutes();
};

export const deleteControllerRoutes = (): express.Router => {
  return deleUserRoutesController();
};
