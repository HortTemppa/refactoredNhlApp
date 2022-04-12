"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NHLRouter = (0, express_1.Router)();
const teams_1 = require("../controllers/teams");
NHLRouter.get("/teams", teams_1.getAllTeams);
//testtest
exports.default = NHLRouter;
