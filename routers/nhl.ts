import { Router } from "express";
import { getPlayerStatsBySeason } from "../controllers/players";
const NHLRouter: Router = Router();

import { getAllTeams, getTeamByID, getTeamRoster } from "../controllers/teams";
import { invalidRoute } from "../errorHandlers/routeError";

/* TEAMSTATS */

NHLRouter.get("/teams", getAllTeams);
NHLRouter.get("/teams/:id", getTeamByID);
NHLRouter.get("/teams/:id/roster", getTeamRoster);

/* PLAYERSTATS & LEADERBOARDS */

NHLRouter.get("/player/:id/:season", getPlayerStatsBySeason);

/* TEAM STANDINGS */

/* INVALID ROUTE, 404*/

NHLRouter.get("*", invalidRoute);

export default NHLRouter;
