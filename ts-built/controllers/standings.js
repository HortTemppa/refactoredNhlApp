"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeagueStandings = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getLeagueStandings = async (req, res, next) => {
    const season = req.params.season;
    const url = `https://statsapi.web.nhl.com/api/v1/standings?season=${season}`;
    try {
        const response = await (0, node_fetch_1.default)(url);
        const standingsJson = await response.json();
        return console.log(standingsJson);
    }
    catch (error) {
        next(error);
    }
};
exports.getLeagueStandings = getLeagueStandings;
