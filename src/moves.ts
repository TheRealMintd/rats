import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { Craftable, GameData, Resource } from "./types";

export function addResource(
	G: GameData,
	ctx: Ctx,
	resource: Resource,
	amount: number
): void {
	const targetResource = G.playerData[parseInt(ctx.currentPlayer)][resource];
	targetResource.amount += targetResource.hasNest ? amount * 2 : amount;
}

export function makeDish(G: GameData, ctx: Ctx): void {
	const inventory = G.playerData[parseInt(ctx.currentPlayer)];
	inventory.dishes.push(inventory.crumbs.amount);
	inventory.crumbs.amount = 0;
}

export function makeDecoration(G: GameData, ctx: Ctx): void {
	const inventory = G.playerData[parseInt(ctx.currentPlayer)];
	inventory.decorations.push(inventory.rags.amount);
	inventory.rags.amount = 0;
}

export function useCocktailSwords(
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
			G.playerData[parseInt(ctx.currentPlayer)][resource].amount +=
				amount;
			// update supply taken for selected player
			G.supplyTaken[selectedPlayer] = resource;
		}
	}
}

export function useBaubles(G: GameData, ctx: Ctx, resource: Resource): void {
	const targetResource = G.playerData[parseInt(ctx.currentPlayer)].baubles;
	if (targetResource.amount > 0) {
		targetResource.amount = 0;
		G.playerData[parseInt(ctx.currentPlayer)][resource].amount += 5;
	}
}

export function buildNest(G: GameData, ctx: Ctx, resource: Resource): void {
	const targetResource = G.playerData[parseInt(ctx.currentPlayer)].straw;
	if (targetResource.amount > 0) {
		targetResource.amount = 0;
		G.playerData[parseInt(ctx.currentPlayer)][resource].hasNest = true;
	}
}

export function useFlowers(G: GameData, ctx: Ctx, type: Craftable): void {
	const inventory = G.playerData[parseInt(ctx.currentPlayer)];
	inventory[type === "dish" ? "dishes" : "decorations"].push(
		inventory.flowers.amount
	);
	inventory.flowers.amount = 0;
}

export function verifyCocktailSwordsOrder(
	G: GameData,
	ctx: Ctx,
	playOrder: string[]
): void | typeof INVALID_MOVE {
	const ids = playOrder.map((order) => parseInt(order));
	const valid = ids
		.map((id, index) => {
			if (index > 0) {
				const prevAmount =
					G.playerData[ids[index - 1]].cocktailSwords.amount;
				const currentAmount = G.playerData[id].cocktailSwords.amount;
				if (prevAmount < currentAmount) {
					return false;
				}
				return true;
			}
		})
		.reduce((acc, curr) => acc && curr, true);
	if (!valid) {
		return INVALID_MOVE;
	} else {
		G.cockTailSwordsOrder = playOrder;
	}
}
