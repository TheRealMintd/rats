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

export type BaseResource = keyof Omit<PlayerInventory, "dishes" | "decorations">;
export type CraftingItems = "crumbs" | "rags" | "flowers";
export type Craftable = "dish" | "decoration";
