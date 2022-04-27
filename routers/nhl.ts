import { Router } from "express";
import { getLeaderboards } from "../controllers/leaderboards";
import { getPlayerStatsBySeason } from "../controllers/players";
import { getLeagueStandings } from "../controllers/standings";
const NHLRouter: Router = Router();

import { getAllTeams, getTeamByID, getTeamRoster } from "../controllers/teams";
import { invalidRoute } from "../errorHandlers/routeError";

/* TEAMSTATS */

NHLRouter.get("/teams", getAllTeams);
NHLRouter.get("/teams/:id", getTeamByID);
NHLRouter.get("/teams/:id/roster", getTeamRoster);

/* PLAYERSTATS & LEADERBOARDS */

NHLRouter.get("/player/:id/:season", getPlayerStatsBySeason);
NHLRouter.get("/leaderboards/:type/:sortBy/:season", getLeaderboards);

/* TEAM STANDINGS */
NHLRouter.get("/standings/league/:season", getLeagueStandings);

/* INVALID ROUTE, 404*/

NHLRouter.get("*", invalidRoute);

export default NHLRouter;
