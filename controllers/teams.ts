import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

interface teamBasicInfo {
  name: string;
  id: number;
}

export const getAllTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch("https://statsapi.web.nhl.com/api/v1/teams");

    const json = await response.json();

    const teams: Array<teamBasicInfo> = json.teams.map((team) => {
      return { name: team.name, id: team.id };
    });

    res.send(teams);
  } catch (error) {
    next(error);
  }
};
