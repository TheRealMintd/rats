import type { Ctx, Game } from "boardgame.io";
import { TurnOrder } from 'boardgame.io/core';

import type { Resource, Craftable, GameData } from "./types";

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
		supplyTaken: new Array(ctx.numPlayers).fill(0).map(() => "none"),
	}),
	moves: {
		addResource(G: GameData, ctx: Ctx, resource: Resource, amount: number) {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)][resource];
			targetResource.amount += targetResource.hasNest
				? amount * 2
				: amount;
		},
		makeDish(G: GameData, ctx: Ctx): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];
			inventory.dishes.push(inventory.crumbs.amount);
			inventory.crumbs.amount = 0;
		},
		makeDecoration(G: GameData, ctx: Ctx): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];
			inventory.decorations.push(inventory.rags.amount);
			inventory.rags.amount = 0;
		},
		useCocktailSwords(
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
					G.playerData[parseInt(ctx.currentPlayer)][
						resource
					].amount += amount;
					// update supply taken for selected player
					G.supplyTaken[selectedPlayer] = resource;
				}
			}
		},
		useBaubles(G: GameData, ctx: Ctx, resource: Resource): void {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)].baubles;
			if (targetResource.amount > 0) {
				targetResource.amount = 0;
				G.playerData[parseInt(ctx.currentPlayer)][resource].amount += 5;
			}
		},
		buildNest(G: GameData, ctx: Ctx, resource: Resource): void {
			const targetResource =
				G.playerData[parseInt(ctx.currentPlayer)].straw;
			if (targetResource.amount > 0) {
				targetResource.amount = 0;
				G.playerData[parseInt(ctx.currentPlayer)][resource].hasNest =
					true;
			}
		},
		useFlowers(G: GameData, ctx: Ctx, type: Craftable): void {
			const inventory = G.playerData[parseInt(ctx.currentPlayer)];
			inventory[type === "dish" ? "dishes" : "decorations"].push(
				inventory.flowers.amount
			);
			inventory.flowers.amount = 0;
		},
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
		outDoCocktailSwords: {
			next: 'outDoBaubles',
			turn: {
				order: {
					first: () => 0,
					next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
					playOrder: (G: GameData, ctx: Ctx) => {
						return sortedByCocktailSowrds(G, ctx);
					}
				}
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

// TODO: return a list of playerIDs sorted by number of cocktail swords they have
function sortedByCocktailSowrds(G: GameData, ctx: Ctx): string[] {
	return ['0', '1', '2'];
}
