export interface Player {
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

export interface Goalie extends Player {
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

export interface FieldPlayer extends Player {
  team: string;
  assists: number;
  goals: number;
  points: number;
  pointsPerGame: number;
  pim: number;
  shots: number;
  games: number;
  hits: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  faceOffPct: number;
  shotPct: number;
  gameWinningGoals: number;
  plusMinus: number;
  timeOnIcePerGame: string;
}
