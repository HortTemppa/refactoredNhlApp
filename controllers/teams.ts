import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

interface teamBasicInfo {
  name: string;
  id: string;
}

interface teamDetailedInfo extends teamBasicInfo {
  teamName: string;
  firstYearOfPlay: string;
  division: string;
  conference: string;
  officialSiteUrl: string;
}

export const getAllTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch("https://statsapi.web.nhl.com/api/v1/teams");

    const json = await response.json();

    const teams = json.teams.map((team): teamBasicInfo => {
      return { name: team.name, id: team.id };
    });

    return res.status(400).send(teams);
  } catch (error) {
    next(error);
  }
};

export const getTeamByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const teamID: string = req.params.id;
  const url: string = `https://statsapi.web.nhl.com/api/v1/teams/${teamID}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    const team: teamDetailedInfo = {
      name: json.teams[0].name,
      id: json.teams[0].id,
      teamName: json.teams[0].teamName,
      firstYearOfPlay: json.teams[0].firstYearOfPlay,
      division: json.teams[0].division.name,
      conference: json.teams[0].conference.name,
      officialSiteUrl: json.teams[0].officialSiteUrl,
    };

    return res.status(400).send(team);
  } catch (error) {
    next(error);
  }
};
