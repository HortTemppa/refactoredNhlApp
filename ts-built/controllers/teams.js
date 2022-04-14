"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamRoster = exports.getTeamByID = exports.getAllTeams = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getAllTeams = async (req, res, next) => {
    try {
        const response = await (0, node_fetch_1.default)("https://statsapi.web.nhl.com/api/v1/teams");
        const json = await response.json();
        const teams = json.teams.map((team) => {
            return { name: team.name, id: team.id };
        });
        return res.status(200).send(teams);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTeams = getAllTeams;
const getTeamByID = async (req, res, next) => {
    const teamID = req.params.id;
    const url = `https://statsapi.web.nhl.com/api/v1/teams/${teamID}`;
    try {
        const response = await (0, node_fetch_1.default)(url);
        const json = await response.json();
        const team = {
            name: json.teams[0].name,
            id: json.teams[0].id,
            teamName: json.teams[0].teamName,
            firstYearOfPlay: json.teams[0].firstYearOfPlay,
            division: json.teams[0].division.name,
            conference: json.teams[0].conference.name,
            officialSiteUrl: json.teams[0].officialSiteUrl,
        };
        return res.status(200).send(team);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeamByID = getTeamByID;
const getTeamRoster = async (req, res, next) => {
    const teamID = req.params.id;
    const url = `https://statsapi.web.nhl.com/api/v1/teams/${teamID}/roster`;
    try {
        const response = await (0, node_fetch_1.default)(url);
        const json = await response.json();
        const roster = json.roster.map((player) => {
            return {
                name: player.person.fullName,
                id: player.person.id,
                jerseyNumber: player.jerseyNumber,
                position: player.position.name,
                positionType: player.position.type,
            };
        });
        return res.status(200).send(roster);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeamRoster = getTeamRoster;
