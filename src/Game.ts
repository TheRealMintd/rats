import type { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import type { BanquetGoal } from "./banquetGoals";
import type { Resource, Craftable, GameData } from "./types";

export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx): GameData => ({
		round: 0,
		banquetGoals: [],
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
		supplyTaken: new Array(ctx.numPlayers).fill(0).map(() => "none"),
	}),
	moves: {
		addResource(G: GameData, ctx: Ctx, resource: Resource, amount: number) {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)][resource];
			targetResource.amount += targetResource.hasNest
				? amount * 2
				: amount;
		},
		makeDish(G: GameData, ctx: Ctx): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];
			inventory.dishes.push(inventory.crumbs.amount);
			inventory.crumbs.amount = 0;
		},
		makeDecoration(G: GameData, ctx: Ctx): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];
			inventory.decorations.push(inventory.rags.amount);
			inventory.rags.amount = 0;
		},
		useCocktailSwords(
			G: GameData,
			ctx: Ctx,
			resource: Resource,
			amount: number,
			selectedPlayer: number
		): void {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)].cocktailSwords;

			if (targetResource.amount > 0) {
				const selectedResource = G.playerData[selectedPlayer][resource];

				// validate the resource of selected player has not been taken by other player
				if (
					G.supplyTaken[selectedPlayer] !== resource &&
					selectedResource.amount >= amount
				) {
					// reset cocktailSwords' amount of current player
					targetResource.amount = 0;
					// deduct resource's amount of selected player
					selectedResource.amount -= amount;
					// add resource's amount of current player
					G.playerData[parseInt(ctx.currentPlayer)][
						resource
					].amount += amount;
					// update supply taken for selected player
					G.supplyTaken[selectedPlayer] = resource;
				}
			}
		},
		useBaubles(G: GameData, ctx: Ctx, resource: Resource): void {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)].baubles;
			if (targetResource.amount > 0) {
				targetResource.amount = 0;
				G.playerData[parseInt(ctx.currentPlayer)][resource].amount += 5;
			}
		},
		buildNest(G: GameData, ctx: Ctx, resource: Resource): void {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)].straw;
			if (targetResource.amount > 0) {
				targetResource.amount = 0;
				G.playerData[parseInt(ctx.currentPlayer)][resource].hasNest =
					true;
			}
		},
		useFlowers(G: GameData, ctx: Ctx, type: Craftable): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];
			inventory[type === "dish" ? "dishes" : "decorations"].push(
				inventory.flowers.amount
			);
			inventory.flowers.amount = 0;
		},
		pickBanquetGoal(
			G: GameData,
			ctx: Ctx,
			banGoal: BanquetGoal
		): void | typeof INVALID_MOVE {
			if (G.banquetGoals.includes(banGoal)) {
				return INVALID_MOVE;
			}
			G.banquetGoals.push(banGoal);
		},
	},
};
