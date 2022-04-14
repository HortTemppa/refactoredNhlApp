"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NHLRouter = (0, express_1.Router)();
const teams_1 = require("../controllers/teams");
const routeError_1 = require("../errorHandlers/routeError");
NHLRouter.get("/teams", teams_1.getAllTeams);
NHLRouter.get("/teams/:id", teams_1.getTeamByID);
NHLRouter.get("/teams/:id/roster", teams_1.getTeamRoster);
NHLRouter.get("*", routeError_1.invalidRoute);
//testtest
exports.default = NHLRouter;
