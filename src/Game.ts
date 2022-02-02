import type { Ctx, Game } from "boardgame.io";
import { TurnOrder } from "boardgame.io/core";

import type { GameData } from "./types";
import {
	pickBanquetGoal,
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
} from "./moves";
import {
	defaultInventory,
	rollDice,
	scavengeSetup,
	setStageForOutdoers,
} from "./utils";

export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx): GameData => ({
		round: 0,
		host: ["0"], // TODO: create logic to choose the host
		dice1: 0,
		dice2: 0,
		banquetGoalIndexes: [],
		players: Object.fromEntries(
			new Array(ctx.numPlayers)
				.fill(0)
				.map((_, player) => [player.toString(), defaultInventory()])
		),
		cockTailSwordsOrder: Array.from({ length: ctx.numPlayers }, (e, i) =>
			i.toString()
		),
		supplyTaken: Object.fromEntries(
			new Array(ctx.numPlayers)
				.fill(0)
				.map((_, player) => [player.toString(), "none"])
		),
		flowers: new Array<number>(ctx.numPlayers).fill(0),
		winner: "none",
	}),
	phases: {
		rollBanquetGoal: {
			start: true,
			moves: { pickBanquetGoal },
			turn: {
				order: TurnOrder.CUSTOM_FROM("host"),
			},
			onBegin(G: GameData, ctx: Ctx) {
				if (ctx.random === undefined) {
					throw new ReferenceError("Ctx.random is undefined");
				}

				rollDice(G, ctx);
				const banquetGoalIndex = G.dice1 + G.dice2 - 2;
				const goalPresent =
					G.banquetGoalIndexes.includes(banquetGoalIndex);

				if (!goalPresent) {
					G.banquetGoalIndexes.push(banquetGoalIndex);
				}
			},
			endIf: (G: GameData) => {
				if (G.banquetGoalIndexes.length === G.round + 1) {
					return {
						next:
							G.round >= 5 ? "calculateResult" : "firstScavenge",
					};
				} else {
					return false;
				}
			},
		},
		firstScavenge: {
			onBegin: scavengeSetup,
			turn: {
				stages: {
					scavenge: {
						moves: { addResource },
					},
				},
			},
			next: "secondScavenge",
		},
		secondScavenge: {
			onBegin: scavengeSetup,
			turn: {
				stages: {
					scavenge: {
						moves: { addResource },
					},
				},
			},
			next: "thirdScavenge",
		},
		thirdScavenge: {
			onBegin: scavengeSetup,
			turn: {
				stages: {
					scavenge: {
						moves: { addResource },
					},
				},
			},
			next: "orderCocktailSwords",
		},
		orderCocktailSwords: {
			moves: { verifyCocktailSwordsOrder },
			turn: {
				order: TurnOrder.CUSTOM_FROM("host"),
			},
			endIf: (G: GameData) => {
				const hostAmount = G.players[G.host[0]].cocktailSwords.amount;
				const cocktailSwordsAmounts = Object.values(G.players).map(
					(inventory) => inventory.cocktailSwords.amount
				);
				// check the cocktail swords amounts for players who out-do the host are repeated or not
				const orderRequired = Object.values(G.players)
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
			onBegin: (G: GameData, ctx: Ctx) =>
				setStageForOutdoers(G, ctx, "baubles", "useBaubles"),
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
			onBegin: (G: GameData, ctx: Ctx) =>
				setStageForOutdoers(G, ctx, "straw", "useStraw"),
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
			onBegin: (G: GameData, ctx: Ctx) =>
				setStageForOutdoers(G, ctx, "crumbs", "useCrumbs"),
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
			onBegin: (G: GameData, ctx: Ctx) =>
				setStageForOutdoers(G, ctx, "rags", "useRags"),
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
				G.flowers = Object.values(G.players).map(
					(inventory) => inventory.flowers.amount
				);
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
				moveLimit: 1,
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
