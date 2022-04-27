import fetch from "node-fetch";

export const getLeagueStandings = async (req, res, next) => {
  const season: string = req.params.season;
  const url: string = `https://statsapi.web.nhl.com/api/v1/standings?season=${season}`;

  try {
    const response = await fetch(url);

    const standingsJson = await response.json();

    return console.log(standingsJson);
  } catch (error) {
    next(error);
  }
};
