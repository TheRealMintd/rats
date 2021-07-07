import type { Ctx, Game } from "boardgame.io";

import type { Resource, Craftable, CraftingItems, GameData } from "./types";

export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx): GameData => ({
		round: 0,
		banquetGoals: Array<number | undefined>(5),
		playerData: new Array(ctx.numPlayers).fill(0).map(() => ({
			cocktailSwords: { hasNest: false, amount: 0 },
			baubles: { hasNest: false, amount: 0 },
			straw: { hasNest: false, amount: 0 },
			crumbs: { hasNest: false, amount: 0 },
			rags: { hasNest: false, amount: 0 },
			flowers: { hasNest: false, amount: 0 },
			dishes: [],
			decorations: [],
		})),
	}),
	moves: {
		addResource(G: GameData, ctx: Ctx, resource: Resource, amount: number) {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)][resource];
			targetResource.amount += targetResource.hasNest
				? amount * 2
				: amount;
		},

		playBaubles(G: GameData, ctx: Ctx, resource: Resource) {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)][resource];
			targetResource.amount += 5;
		},

		addNest(G: GameData, ctx: Ctx, resource: Resource) {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)][resource];
			targetResource.hasNest = true;
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
			const value = inventory[usedItem].amount;
			inventory[usedItem].amount = 0;

			if (type === "dish") {
				inventory.dishes.push(value);
			} else {
				inventory.decorations.push(value);
			}
		},
	},
};
