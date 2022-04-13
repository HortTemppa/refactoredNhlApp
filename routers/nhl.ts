import { Router } from "express";
const NHLRouter: Router = Router();

import { getAllTeams, getTeamByID } from "../controllers/teams";

NHLRouter.get("/teams", getAllTeams);
NHLRouter.get("/teams/:id", getTeamByID);

//testtest
export default NHLRouter;
