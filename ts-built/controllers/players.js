"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerStatsBySeason = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getPlayerStatsBySeason = async (req, res, next) => {
    const playerID = req.params.id;
    const season = req.params.season;
    const basicUrl = `https://statsapi.web.nhl.com/api/v1/people/${playerID}`;
    const statsUrl = `https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeason&season=${season}`;
    try {
        const playerInfoResponse = await (0, node_fetch_1.default)(basicUrl);
        const playerJson = await playerInfoResponse.json();
        const player = {
            name: playerJson.people[0].fullName,
            id: playerID,
            number: playerJson.people[0].primaryNumber,
            birthDate: playerJson.people[0].birthDate,
            nationality: playerJson.people[0].nationality,
            height: playerJson.people[0].height,
            weight: playerJson.people[0].weight,
            position: playerJson.people[0].primaryPosition.name,
            positionType: playerJson.people[0].primaryPosition.type,
        };
        const statsResponse = await (0, node_fetch_1.default)(statsUrl);
        const statsJson = await statsResponse.json();
        //If player stats are not available for the desired season, only basic player info shall be returned
        if (!statsJson.stats[0].splits[0]) {
            return res.status(200).send(player);
        }
        const stats = statsJson.stats[0].splits[0].stat;
        let statsAvailable = true;
        console.log(stats);
        return res.status(200).send("Here Shall be the stats.");
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.getPlayerStatsBySeason = getPlayerStatsBySeason;
