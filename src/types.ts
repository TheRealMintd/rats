import type { BanquetGoal } from "./banquetGoals";

export interface GameData {
	round: number;
	banquetGoals: Array<BanquetGoal>;
	playerData: PlayerInventory[];
	supplyTaken: Array<Resource | "none">;
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
