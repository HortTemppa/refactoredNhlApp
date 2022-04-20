"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboards = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getLeaderboards = async (req, res, next) => {
    /*Type meaning preseason (= 0), play offs ( = 1) or regular season ( = 2)*/
    const season = req.params.season;
    const type = req.params.type;
    const sortBy = req.params.sortBy;
    const url = `https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22${sortBy}%22,%22direction%22:%22DESC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=${type}%20and%20seasonId%3C=${season}%20and%20seasonId%3E=${season}`;
    try {
        const response = await (0, node_fetch_1.default)(url);
        const leaderboardJson = await response.json();
        res.status(200).json(leaderboardJson.data);
    }
    catch (error) {
        next(error);
    }
};
exports.getLeaderboards = getLeaderboards;
