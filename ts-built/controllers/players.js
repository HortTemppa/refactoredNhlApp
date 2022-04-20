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
        if (player.position === "Goalie") {
            /*Returns goalie stats.*/
            const goalie = {
                ...player,
                team: playerJson.people[0].currentTeam.name,
                otLosses: stats.ot,
                shutouts: stats.shutouts,
                ties: stats.ties,
                wins: stats.wins,
                losses: stats.losses,
                saves: stats.saves,
                powerPlaySaves: stats.powerPlaySaves,
                shortHandedSaves: stats.shortHandedSaves,
                evenSaves: stats.evenSaves,
                shortHandedShots: stats.shortHandedShots,
                evenShots: stats.evenShots,
                powerPlayShots: stats.powerPlayShots,
                savePercentage: stats.savePercentage,
                goalAgainstAverage: stats.goalAgainstAverage,
                games: stats.games,
                gamesStarted: stats.gamesStarted,
                shotsAgainst: stats.shotsAgainst,
                goalsAgainst: stats.goalsAgainst,
                timeOnIcePerGame: stats.timeOnIcePerGame,
                powerPlaySavePercentage: stats.powerPlaySavePercentage,
                shortHandedSavePercentage: stats.shortHandedSavePercentage,
                evenStrengthSavePercentage: stats.evenStrengthSavePercentage,
            };
            return res.status(200).json(goalie);
        }
        else {
            /*Returns field player stats.*/
            const fieldPlayer = {
                ...player,
                team: playerJson.people[0].currentTeam.name,
                assists: stats.assists,
                goals: stats.goals,
                points: stats.points,
                pointsPerGame: Math.round((stats.points / stats.games) * 100) / 100,
                pim: stats.pim,
                shots: stats.shots,
                games: stats.games,
                hits: stats.hits,
                powerPlayGoals: stats.powerPlayGoals,
                powerPlayPoints: stats.powerPlayPoints,
                faceOffPct: stats.faceOffPct,
                shotPct: stats.shotPct,
                gameWinningGoals: stats.gameWinningGoals,
                plusMinus: stats.plusMinus,
                timeOnIcePerGame: stats.timeOnIcePerGame,
            };
            return res.status(200).json(fieldPlayer);
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.getPlayerStatsBySeason = getPlayerStatsBySeason;
