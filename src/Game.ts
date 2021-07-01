import { Game } from "boardgame.io";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/naming-convention */
export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx) => ({
		round: 0,
		banquetGoals: Array(5),
		playerData: new Array(ctx.numPlayers)
			.fill(0)
			.map(() => ({
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
