import { Router } from "express";
const NHLRouter: Router = Router();

import { getAllTeams, getTeamByID, getTeamRoster } from "../controllers/teams";

NHLRouter.get("/teams", getAllTeams);
NHLRouter.get("/teams/:id", getTeamByID);
NHLRouter.get("/teams/:id/roster", getTeamRoster);

//testtest
export default NHLRouter;
