import type { Ctx, Game } from "boardgame.io";
import { TurnOrder } from "boardgame.io/core";

import type { GameData } from "./types";
import {
	addResource,
	makeDish,
	makeDecoration,
	useCocktailSwords,
	useBaubles,
	buildNest,
	useFlowers,
	verifyCocktailSwordsOrder,
	playersTieOnFlowers,
	determineHost,
	findWinners,
	verifyWinner,
	rollDice,
} from "./moves";

export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx): GameData => ({
		round: 0,
		host: 0, // TODO: create logic to choose the host
		dice1: 0,
		dice2: 0,
		banquetGoalIndexes: [],
		resourceOrder: [
			"cocktailSwords",
			"baubles",
			"straw",
			"crumbs",
			"straw",
			"rags",
			"flowers",
		],
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
		cockTailSwordsOrder: Array.from({ length: ctx.numPlayers }, (e, i) =>
			i.toString()
		),
		supplyTaken: new Array(ctx.numPlayers).fill(0).map(() => "none"),
		flowers: new Array<number>(ctx.numPlayers).fill(0),
		winner: "none"
	}),
	moves: {},
	phases: {
		rollBanquetGoal: {
			moves: {},
			turn: {
				order: TurnOrder.CUSTOM_FROM("host"),
			},
			endIf: (G: GameData) => {
				return {
					next: G.round >= 5 ? "calculateResult" : "firstScavenge",
				};
			},
		},
		firstScavenge: {
			moves: {},
			onBegin: (G: GameData, ctx: Ctx) => {
				// ctx.events?.setActivePlayers({all: "scavenge"});
				// Roll dices
				rollDice(G, ctx);
			},
			turn: {
				stages: {
					scavenge: {
						moves: { addResource }
					}
				}
			},
			next: "secondScavenge",
		},
		secondScavenge: {
			moves: {},
			onBegin: (G: GameData, ctx: Ctx) => {
				// ctx.events?.setActivePlayers({all: "scavenge"});
				// Roll dices
				rollDice(G, ctx);
			},
			turn: {
				stages: {
					scavenge: {
						moves: { addResource }
					}
				}
			},
			next: "thirdScavenge",
		},
		thirdScavenge: {
			moves: {},
			onBegin: (G: GameData, ctx: Ctx) => {
				// ctx.events.setActivePlayers({all: "scavenge"});
				// Roll dices
				rollDice(G, ctx);
			},
			turn: {
				stages: {
					scavenge: {
						moves: { addResource }
					}
				}
			},
			next: "outDoCocktailSwords",
		},
		orderCocktailSwords: {
			moves: { verifyCocktailSwordsOrder },
			turn: {
				order: TurnOrder.CUSTOM_FROM("host"),
			},
			endIf: (G: GameData) => {
				const hostAmount = G.playerData[G.host].cocktailSwords.amount;
				const cocktailSwordsAmounts = G.playerData.map(
					(inventory) => inventory.cocktailSwords.amount
				);
				// check the cocktail swords amounts for players who out-do the host are repeated or not
				const orderRequired = G.playerData
					.map((inventory) => {
						const currentAmount = inventory.cocktailSwords.amount;
						return (
							currentAmount > hostAmount &&
							cocktailSwordsAmounts.filter(
								(amount) => amount === currentAmount
							).length > 1
						);
					})
					.reduce((acc, curr) => acc || curr, false);
				return !orderRequired;
			},
			next: "outDoCocktailSwords",
		},
		outDoCocktailSwords: {
			next: "outDoBaubles",
			turn: {
				order: TurnOrder.CUSTOM_FROM("cocktailSwordsOrder"),
			},
			moves: { useCocktailSwords },
		},
		outDoBaubles: {
			next: "outDoStraw",
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host
			},
			turn: {
				stages: {
					useBaubles: {
						moves: { useBaubles },
					},
				},
			},
		},
		outDoStraw: {
			next: "outDoCrumbs",
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host
			},
			turn: {
				stages: {
					useStraw: {
						moves: { buildNest },
					},
				},
			},
		},
		outDoCrumbs: {
			next: "outDoRags",
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host
			},
			turn: {
				stages: {
					useCrumbs: {
						moves: { makeDish },
					},
				},
			},
		},
		outDoRags: {
			next: "outDoFlowers",
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host
			},
			turn: {
				stages: {
					useRags: {
						moves: { makeDecoration },
					},
				},
			},
		},
		outDoFlowers: {
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host
				// Keep a copy of flowers amount for each player
				G.flowers = G.playerData.map((inventory) => inventory.flowers.amount);
				// Determine the new host
				return {
					next:
						playersTieOnFlowers(G, ctx).length > 0
							? "determineHost"
							: "rollBanquetGoal",
				};
			},
			turn: {
				stages: {
					useFlowers: {
						moves: { useFlowers },
					},
				},
			},
		},
		determineHost: {
			next: "rollBanquetGoal",
			moves: { determineHost },
			turn: {
				order: TurnOrder.CUSTOM_FROM("host"),
			},
		},
		calculateResult: {
			moves: { verifyWinner },
			turn: {
				order: TurnOrder.CUSTOM_FROM("host"),
			},
			onBegin: (G: GameData, ctx: Ctx) => {
				const winners = findWinners(G, ctx);
				if (winners.length === 1) {
					G.winner = winners[0];
					return { winner: G.winner };
				}
			},
			onEnd: (G: GameData, _: Ctx) => {
				return { winner: G.winner };
			},
		},
	},
};
