import type { Game } from "boardgame.io";

import type { GameData } from "./types";

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
};
