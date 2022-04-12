"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTeams = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getAllTeams = async (req, res, next) => {
    try {
        const response = await (0, node_fetch_1.default)("https://statsapi.web.nhl.com/api/v1/teams");
        const json = await response.json();
        const teams = json.teams.map((team) => {
            return { name: team.name, id: team.id };
        });
        res.send(teams);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTeams = getAllTeams;
