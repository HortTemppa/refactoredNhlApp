import fetch, { Response } from "node-fetch";
import { Player, Goalie } from "../interfaces/playerInterfaces";

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

    if (player.position === "Goalie") {
      const goalie: Goalie = {
        ...player,
        team: statsJson.currentTeam.name,
        otLosses: statsJson.ot,
        shutouts: statsJson.shutouts,
        ties: statsJson.ties,
        wins: statsJson.wins,
        losses: statsJson.losses,
        saves: statsJson.saves,
        powerPlaySaves: statsJson.powerPlaySaves,
        shortHandedSaves: statsJson.shortHandedSaves,
        evenSaves: statsJson.evenSaves,
        shortHandedShots: statsJson.shortHandedShots,
        evenShots: statsJson.evenShots,
        powerPlayShots: statsJson.powerPlayShots,
        savePercentage: statsJson.savePercentage,
        goalAgainstAverage: statsJson.goalAgainstAverage,
        games: statsJson.games,
        gamesStarted: statsJson.gamesStarted,
        shotsAgainst: statsJson.shotsAgainst,
        goalsAgainst: statsJson.goalsAgainst,
        timeOnIcePerGame: statsJson.timeOnIcePerGame,
        powerPlaySavePercentage: statsJson.powerPlaySavePercentage,
        shortHandedSavePercentage: statsJson.shortHandedSavePercentage,
        evenStrengthSavePercentage: statsJson.evenStrengthSavePercentage,
      };
      return res.status(200).json(goalie);
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
