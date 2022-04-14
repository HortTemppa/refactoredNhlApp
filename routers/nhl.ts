import { Router } from "express";
const NHLRouter: Router = Router();

import { getAllTeams, getTeamByID, getTeamRoster } from "../controllers/teams";
import { invalidRoute } from "../errorHandlers/routeError";

NHLRouter.get("/teams", getAllTeams);
NHLRouter.get("/teams/:id", getTeamByID);
NHLRouter.get("/teams/:id/roster", getTeamRoster);
NHLRouter.get("*", invalidRoute);

export default NHLRouter;
