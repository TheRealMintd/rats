import type { BanquetGoal } from "./banquetGoals";

export interface GameData {
	round: number;
	host: number;
	dice1: number;
	dice2: number;
	resourceOrder: Resource[];
	banquetGoalIndexes: number[];
	playerData: PlayerInventory[];
	cockTailSwordsOrder: Array<string>;
	supplyTaken: Array<Resource | "none">;
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

export type Resource = keyof Omit<PlayerInventory, "dishes" | "decorations">;
export type Craftable = "dish" | "decoration";
