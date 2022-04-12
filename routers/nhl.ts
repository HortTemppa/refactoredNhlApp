import { Router } from "express";
const NHLRouter: Router = Router();

import { getAllTeams } from "../controllers/teams";

NHLRouter.get("/teams", getAllTeams);

//testtest
export default NHLRouter;
