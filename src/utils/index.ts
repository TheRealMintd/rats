import { PlayerInventory } from "../types";

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
