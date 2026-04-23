export type DriverStanding = {
	number: number;
	playerName: string;
	starts: number;
	points: number;
	wins: number;
	top5: number;
	top10: number;
	poles: number;
	dnfs: number;
	fastLaps: number;
	isPlayer: boolean;
};

export type EventResult = {
	trackName: string;
	winner: string;
	pole: string;
	fastLap: string;
	results: string[];
};

export type ChampionshipSeries = {
	vehicleType: string;
	drivers: DriverStanding[];
	events: EventResult[];
};

export type ChampionshipFile = ChampionshipSeries[];