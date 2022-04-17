import { Stats } from "fs";
import fetch, { Response } from "node-fetch";

export const getPlayerStatsBySeason = async (req, res, next) => {
  const playerID: string = req.params.id;
  const season: string = req.params.season;

  const basicUrl: string = `https://statsapi.web.nhl.com/api/v1/people/${playerID}`;
  const statsUrl: string = `https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeason&season=${season}`;

  interface Player {
    name: string;
    id: string;
    number: string;
    birthDate: string;
    nationality: string;
    height: string;
    weight: string;
    position: string;
    positionType: string;
  }

  interface Goalie extends Player {
    otLosses: number;
    shutouts: number;
    ties: number;
    wins: number;
    losses: number;
    saves: number;
    powerPlaySaves: number;
    shortHandedSaves: number;
    evenSaves: number;
    shortHandedShots: number;
    evenShots: number;
    powerPlayShots: number;
    savePercentage: number;
    goalAgainstAverage: number;
    games: number;
    gamesStarted: number;
    shotsAgainst: number;
    goalsAgainst: number;
    timeOnIcePerGame: number;
    powerPlaySavePercentage: number;
    shortHandedSavePercentage: number;
    evenStrengthSavePercentage: number;
    team?: string;
  }

  try {
    const playerInfoResponse: Response = await fetch(basicUrl);
    const playerJson = await playerInfoResponse.json();

    const player: Player = {
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

    const statsResponse: Response = await fetch(statsUrl);
    const statsJson = await statsResponse.json();

    //If player stats are not available for the desired season, only basic player info shall be returned

    if (!statsJson.stats[0].splits[0]) {
      return res.status(200).send(player);
    }

    const stats = statsJson.stats[0].splits[0].stat;

    let statsAvailable: boolean = true;

    console.log(stats);

    return res.status(200).send("Here Shall be the stats.");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
