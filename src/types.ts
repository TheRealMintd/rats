export interface GameData {
	round: number;
	host: [string];
	dice1: number;
	dice2: number;
	banquetGoalIndexes: number[];
	players: PlayerData;
	cockTailSwordsOrder: Array<string>;
	supplyTaken: { [player: string]: Resource | "none"},
	flowers: Array<number>;
	winner: string;
}

export interface PlayerInventory {
	cocktailSwords: BaseResource;
	baubles: BaseResource;
	straw: BaseResource;
	crumbs: BaseResource;
	rags: BaseResource;
	flowers: BaseResource;
	dishes: number[];
	decorations: number[];
}

export interface BaseResource {
	hasNest: boolean;
	amount: number;
}

export type PlayerData = { [player: string]: PlayerInventory };
export type Resource = keyof Omit<PlayerInventory, "dishes" | "decorations">;
export type Craftable = "dish" | "decoration";
