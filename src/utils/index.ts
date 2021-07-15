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
export function sortedByCocktailSowrds(G: GameData): string[] {
	return G.playerData
		.filter((inventory) => {
			inventory.cocktailSwords.amount >
				G.playerData[G.host].cocktailSwords.amount;
		})
		.map((inventory, player) => ({
			player,
			cocktailSwords: inventory.cocktailSwords.amount,
		}))
		.sort(({ cocktailSwords: a }, { cocktailSwords: b }) => b - a)
		.map((obj) => obj.player.toString());
}
