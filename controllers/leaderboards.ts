import fetch, { Response } from "node-fetch";

export const getLeaderboards = async (req, res, next) => {
  /*type meaning preseason (= 0), regular season ( = 1) or playoffs ( = 2)*/

  const season: string = req.params.season;
  const type: string = req.params.season;
  const sortBy: string = req.params.sortBy;

  const url: string = `https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22${sortBy}%22,%22direction%22:%22DESC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=${type}%20and%20seasonId%3C=${season}%20and%20seasonId%3E=${season}`;

  try {
    const response: Response = await fetch(url);
    const leaderboardJson: JSON = await response.json();

    res.status(200).send(leaderboardJson);
  } catch (error) {
    next(error);
  }
};
