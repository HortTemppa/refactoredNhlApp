import fetch from "node-fetch";
export const getAllTeams = async (req, res, next) => {
  console.log("fetching data");
  try {
    const response = await fetch("https://statsapi.web.nhl.com/api/v1/teams");

    const json = await JSON.stringify(response.json());
  } catch (error) {
    next(error);
  }
};
