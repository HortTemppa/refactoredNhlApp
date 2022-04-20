"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboards_1 = require("../controllers/leaderboards");
const players_1 = require("../controllers/players");
const NHLRouter = (0, express_1.Router)();
const teams_1 = require("../controllers/teams");
const routeError_1 = require("../errorHandlers/routeError");
/* TEAMSTATS */
NHLRouter.get("/teams", teams_1.getAllTeams);
NHLRouter.get("/teams/:id", teams_1.getTeamByID);
NHLRouter.get("/teams/:id/roster", teams_1.getTeamRoster);
/* PLAYERSTATS & LEADERBOARDS */
NHLRouter.get("/player/:id/:season", players_1.getPlayerStatsBySeason);
NHLRouter.get("/leaderboards/:type/:sortBy/:season", leaderboards_1.getLeaderboards);
/* TEAM STANDINGS */
/* INVALID ROUTE, 404*/
NHLRouter.get("*", routeError_1.invalidRoute);
exports.default = NHLRouter;
