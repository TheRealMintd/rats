import type { Ctx, Game } from "boardgame.io";
import { TurnOrder } from 'boardgame.io/core';

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
} from "./moves";

export const Rats: Game = {
	maxPlayers: 6,
	setup: (ctx): GameData => ({
		round: 0,
		host: 0, // TODO: create logic to choose the host
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
		cockTailSwordsOrder: Array.from({length: ctx.numPlayers}, (e, i)=> i.toString()),
		supplyTaken: new Array(ctx.numPlayers).fill(0).map(() => "none"),
	}),
	moves: {
		addResource,
		makeDish, 
		makeDecoration, 
		useCocktailSwords, 
		useBaubles, 
		buildNest, 
		useFlowers
	},
	phases: {
		rollBanquetGoal: {
			moves: {  },
			turn: {
				order: TurnOrder.CUSTOM_FROM('host') 
			},
			endIf: (G: GameData) => {
				return {
					next: G.round >= 5 ? 'calculateResult' : 'firstScavenge'
				};
			}
		},
		firstScavenge: {
			moves: {  },
			onBegin: (G: GameData, ctx: Ctx) => {
				// ctx.events?.setActivePlayers({all: 'scavenge'});
				// TODO: roll dices
			},
			turn: {
				stages: {
					scavenge: { 
						moves: {
							// TODO: make choice based on dices rolled
						}
					 }
				}
			},
			next: 'secondScavenge'
		},
		secondScavenge: {
			moves: {  },
			onBegin: (G: GameData, ctx: Ctx) => {
				// ctx.events?.setActivePlayers({all: 'scavenge'});
				// TODO: roll dices
			},
			turn: {
				stages: {
					scavenge: {  }
				}
			},
			next: 'thirdScavenge'
		},
		thirdScavenge: {
			moves: {  },
			onBegin: (G: GameData, ctx: Ctx) => {
				// ctx.events.setActivePlayers({all: 'scavenge'});
				// TODO: roll dices
			},
			turn: {
				stages: {
					scavenge: {  }
				}
			},
			next: 'outDoCocktailSwords'
		},
		orderCocktailSwords: {
			moves: { verifyCocktailSwordsOrder },
			turn: {
				order: TurnOrder.CUSTOM_FROM("host")
			},
			endIf: (G: GameData) => {
				const hostAmount = G.playerData[G.host].cocktailSwords.amount;
				const cocktailSwordsAmounts = G.playerData.map(inventory => inventory.cocktailSwords.amount);
				// check the cocktail swords amounts for players who out-do the host are repeated or not
				const orderRequired = G.playerData.map(inventory => {
					const currentAmount = inventory.cocktailSwords.amount;
					return currentAmount > hostAmount && cocktailSwordsAmounts.filter(amount => amount === currentAmount).length > 1;
				}).reduce((acc, curr) => acc || curr, false);
				return !orderRequired;
			},
			next: "outDoCocktailSwords"
		},
		outDoCocktailSwords: {
			next: 'outDoBaubles',
			turn: {
				order: TurnOrder.CUSTOM_FROM("cocktailSwordsOrder")
			},
			moves: {  }
		},
		outDoBaubles: {
			next: 'outDoStraw',
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host 
			},
			moves: {  }
		},
		outDoStraw: {
			next: 'outDoCrumbs',
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host 
			},
			moves: {  }
		},
		outDoCrumbs: {
			next: 'outDoRags',
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host 
			},
			moves: {  }
		},
		outDoRags: {
			next: 'outDoFlowers',
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host 
			},
			moves: {  }
		},
		outDoFlowers: {
			next: 'rollBanquetGoal',
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: set active players who out-do host 
				// TODO: determine the new host
			},
			moves: {  }
		},
		calculateResult: {
			moves: { 
				// TODO: the host decide who is the winner
			},
			turn: {
				order: TurnOrder.CUSTOM_FROM('host') 
			},
			onBegin: (G: GameData, ctx: Ctx) => {
				// TODO: calculate the score and determine the winner
				// if there's a tie, then the host will do a move
				// else the game ends
			}
		}
	}
};
