export interface teamBasicInfo {
  name: string;
  id: string;
}

export interface teamDetailedInfo extends teamBasicInfo {
  teamName: string;
  firstYearOfPlay: string;
  division: string;
  conference: string;
  officialSiteUrl: string;
}

export interface playerBasicInfo {
  name: string;
  id: string;
  jerseyNumber: string;
  position: string;
  positionType: string;
}
