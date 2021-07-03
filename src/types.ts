export interface GameData {
	round: number;
	banquetGoals: Array<number | undefined>;
	playerData: PlayerInventory[];
}

export interface PlayerInventory {
	cocktailSwords: number;
	baubles: number;
	straw: number;
	crumbs: number;
	rags: number;
	flowers: number;
	dishes: number[];
	decorations: number[];
}

