import { Ctx } from "boardgame.io";

import { GameData, PlayerInventory, Resource } from "../types";

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
				G.playerData[parseInt(G.host[0])].cocktailSwords.amount
		)
		.sort(({ cocktailSwords: a }, { cocktailSwords: b }) => b - a)
		.map((obj) => obj.player.toString());
}

export function rollDice(G: GameData, ctx: Ctx): void {
	if (ctx.random === undefined) {
		throw new ReferenceError("Ctx.random is undefined");
	}
	G.dice1 = ctx.random.D6();
	G.dice2 = ctx.random.D6();
}

export function scavengeSetup(G: GameData, ctx: Ctx): void {
	if (ctx.events?.setActivePlayers === undefined) {
		throw new ReferenceError("Ctx.EventsAPI.setActivePlayers is undefined");
	}
	ctx.events.setActivePlayers({ all: "scavenge" });
	// Roll dice
	rollDice(G, ctx);
}

export function findPlayersWhoOutdoHost(G: GameData, item: Resource): string[] {
	const hostAmount = G.playerData[parseInt(G.host[0])][item].amount;
	return G.playerData.flatMap(({ [item]: { amount } }, index) =>
		G.host[0] === index.toString() || amount > hostAmount
			? []
			: [index.toString()]
	);
}

export function setStageForOutdoers(
	G: GameData,
	ctx: Ctx,
	item: Resource,
	stageName: string
): void {
	if (ctx.events?.setActivePlayers === undefined) {
		throw new ReferenceError("Ctx.EventsAPI.setActivePlayers is undefined");
	}

	const active = findPlayersWhoOutdoHost(G, "baubles").map((player) => [
		player,
		stageName,
	]);

	ctx.events.setActivePlayers({
		value: active.length
			? (Object.fromEntries(active) as unknown)
			: { value: { [G.host[0]]: stageName } },
		moveLimit: 1,
	});
}
