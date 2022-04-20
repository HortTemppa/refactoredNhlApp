import fetch, { Response } from "node-fetch";
import { Player, Goalie, FieldPlayer } from "../interfaces/playerInterfaces";

export const getPlayerStatsBySeason = async (req, res, next) => {
  const playerID: string = req.params.id;
  const season: string = req.params.season;

  const basicUrl: string = `https://statsapi.web.nhl.com/api/v1/people/${playerID}`;
  const statsUrl: string = `https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeason&season=${season}`;

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

    if (player.position === "Goalie") {
      /*Returns goalie stats.*/

      const goalie: Goalie = {
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
    } else {
      /*Returns field player stats.*/

      const fieldPlayer: FieldPlayer = {
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};
