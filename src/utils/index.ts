import { Ctx } from "boardgame.io";

import { rollDice } from "../moves";
import { GameData, PlayerInventory } from "../types";

export function defaultInventory(): PlayerInventory {
	return {
		cocktailSwords: { hasNest: false, amount: 0 },
		baubles: { hasNest: false, amount: 0 },
		straw: { hasNest: false, amount: 0 },
		crumbs: { hasNest: false, amount: 0 },
		rags: { hasNest: false, amount: 0 },
		flowers: { hasNest: false, amount: 0 },
		dishes: [],
		decorations: [],
	};
}

/**
 * Return a list of player IDs sorted by number of cocktail swords they have
 * and must out-do the cocktail swords amount the host has.
 *
 * @param G
 * @returns a list of string representing the player ID
 */
export function sortedByCocktailSwords(G: GameData): string[] {
	return G.playerData
		.map((inventory, player) => ({
			player,
			cocktailSwords: inventory.cocktailSwords.amount,
		}))
		.filter(
			(obj) =>
				obj.cocktailSwords >
				G.playerData[G.host[0]].cocktailSwords.amount
		)
		.sort(({ cocktailSwords: a }, { cocktailSwords: b }) => b - a)
		.map((obj) => obj.player.toString());
}

export function scavengeSetup(G: GameData, ctx: Ctx): void {
	if (ctx.events?.setActivePlayers === undefined) {
		throw new ReferenceError("Ctx.EventsAPI.setActivePlayers is undefined");
	}
	ctx.events.setActivePlayers({ all: "scavenge" });
	// Roll dices
	rollDice(G, ctx);
}
