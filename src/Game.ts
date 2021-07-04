import type { Ctx, Game } from "boardgame.io";

import type { BaseResource, Craftable, CraftingItems, GameData } from "./types";

export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx): GameData => ({
		round: 0,
		banquetGoals: Array<number | undefined>(5),
		playerData: new Array(ctx.numPlayers).fill(0).map(() => ({
			cocktailSwords: 0,
			baubles: 0,
			straw: 0,
			crumbs: 0,
			rags: 0,
			flowers: 0,
			dishes: [],
			decorations: [],
		})),
	}),
	moves: {
		addResource(
			G: GameData,
			ctx: Ctx,
			resource: BaseResource,
			amount: number
		) {
			G.playerData[parseInt(ctx.currentPlayer)][resource] += amount;
		},
		makeDishOrDecoration(
			G: GameData,
			ctx: Ctx,
			type: Craftable,
			usingFlowers = false
		): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];

			// extract the ingredient that is being used to craft
			let usedItem: CraftingItems;
			if (usingFlowers) {
				usedItem = "flowers";
			} else if (type === "dish") {
				usedItem = "crumbs";
			} else {
				usedItem = "rags";
			}
			const value = inventory[usedItem];
			inventory[usedItem] = 0;

			if (type === "dish") {
				inventory.dishes.push(value);
			} else {
				inventory.decorations.push(value);
			}
		},
	},
};
