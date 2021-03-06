import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { Craftable, GameData, Resource } from "./types";
import { banquetGoals } from "./banquetGoals";

const RESOURCE_ORDER = [
	"cocktailSwords",
	"baubles",
	"straw",
	"crumbs",
	"rags",
	"flowers",
];

export function pickBanquetGoal(
	G: GameData,
	_: Ctx,
	index: number
): void | typeof INVALID_MOVE {
	if (G.banquetGoalIndexes.includes(index)) {
		return INVALID_MOVE;
	}
	G.banquetGoalIndexes.push(index);
}

export function addResource(
	G: GameData,
	ctx: Ctx,
	resource: Resource,
	amount: number
): void | typeof INVALID_MOVE {
	//get the validity of dice
	const resourceIndex =
		RESOURCE_ORDER.findIndex((item) => item === resource) + 1;
	const valid =
		(G.dice1 === G.dice2 && G.dice1 === amount) ||
		(G.dice1 === amount && G.dice2 === resourceIndex) ||
		(G.dice2 === amount && G.dice1 === resourceIndex);
	if (!valid) {
		return INVALID_MOVE;
	}

	const targetResource = G.players[ctx.currentPlayer][resource];
	targetResource.amount += targetResource.hasNest ? amount * 2 : amount;
}

export function makeDish(G: GameData, ctx: Ctx): void {
	const inventory = G.players[ctx.currentPlayer];
	inventory.dishes.push(inventory.crumbs.amount);
	inventory.crumbs.amount = 0;
}

export function makeDecoration(G: GameData, ctx: Ctx): void {
	const inventory = G.players[ctx.currentPlayer];
	inventory.decorations.push(inventory.rags.amount);
	inventory.rags.amount = 0;
}

export function useCocktailSwords(
	G: GameData,
	ctx: Ctx,
	resource: Resource,
	amount: number,
	selectedPlayer: string
): void {
	const targetResource = G.players[ctx.currentPlayer].cocktailSwords;

	if (targetResource.amount > 0) {
		const selectedResource = G.players[selectedPlayer][resource];

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
			G.players[ctx.currentPlayer][resource].amount += amount;
			// update supply taken for selected player
			G.supplyTaken[selectedPlayer] = resource;
		}
	}
}

export function useBaubles(G: GameData, ctx: Ctx, resource: Resource): void {
	const targetResource = G.players[ctx.currentPlayer].baubles;
	if (targetResource.amount > 0) {
		targetResource.amount = 0;
		G.players[ctx.currentPlayer][resource].amount += 5;
	}
}

export function buildNest(G: GameData, ctx: Ctx, resource: Resource): void {
	const targetResource = G.players[ctx.currentPlayer].straw;
	if (targetResource.amount > 0) {
		targetResource.amount = 0;
		G.players[ctx.currentPlayer][resource].hasNest = true;
	}
}

export function useFlowers(G: GameData, ctx: Ctx, type: Craftable): void {
	const inventory = G.players[ctx.currentPlayer];
	inventory[type === "dish" ? "dishes" : "decorations"].push(
		inventory.flowers.amount
	);
	inventory.flowers.amount = 0;
}

export function verifyCocktailSwordsOrder(
	G: GameData,
	ctx: Ctx,
	playOrder: string[]
): void | typeof INVALID_MOVE {
	const valid = playOrder.every((player, index) => {
		if (index === 0) {
			return true;
		}

		const previousAmount =
			G.players[playOrder[index - 1]].cocktailSwords.amount;
		const amount = G.players[player].cocktailSwords.amount;
		return previousAmount >= amount;
	});

	if (!valid) {
		return INVALID_MOVE;
	} else {
		G.cockTailSwordsOrder = playOrder;
	}
}

/**
 * Return a list of player IDs who has the most and more flowers than the host,
 * and are tie with each other.
 * @param G
 * @param _
 * @returns a list of player IDs
 */
export function playersTieOnFlowers(G: GameData, _: Ctx): string[] {
	const maxFlowersAmount = Math.max(
		...G.flowers.filter((amount) => amount > G.flowers[parseInt(G.host[0])])
	);
	if (maxFlowersAmount === 0) {
		return [];
	}
	return G.flowers.flatMap((count, index) =>
		count === maxFlowersAmount ? [index.toString()] : []
	);
}

export function determineHost(
	G: GameData,
	ctx: Ctx,
	host: number
): void | typeof INVALID_MOVE {
	if (playersTieOnFlowers(G, ctx).includes(host.toString())) {
		G.host = [host.toString()];
	} else {
		return INVALID_MOVE;
	}
}

/**
 * Calculate the score for each player.
 * The index of the return array represents the player ID,
 * and the value represents their score.
 * @param G
 * @param ctx
 * @returns a list of numbers
 */
export function calculateScores(G: GameData, ctx: Ctx): number[] {
	const rankings = G.banquetGoalIndexes.map((index) =>
		banquetGoals[index].findWinners(G.players)
	);
	return new Array<number>(ctx.numPlayers).map((score, index) => {
		return rankings
			.map((ranking) => {
				let internalScore = 0;
				if (ranking.first.includes(index.toString())) {
					internalScore = 3;
				} else if (ranking.second.includes(index.toString())) {
					internalScore = 2;
				} else if (ranking.third.includes(index.toString())) {
					internalScore = 1;
				}
				return internalScore;
			})
			.reduce((acc, curr) => acc + curr, 0);
	});
}

/**
 * Return a list of strings representing the player ID who
 * has the highest score.
 * @param G
 * @param ctx
 * @returns a list of strings
 */
export function findWinners(G: GameData, ctx: Ctx): string[] {
	const scores = calculateScores(G, ctx);
	const highestScore = Math.max(...scores);
	const winners: string[] = [];
	scores.forEach((score, index) =>
		score === highestScore ? winners.push(index.toString()) : winners.push()
	);
	return winners;
}

/**
 * Verify the winner is one of the winners whose score
 * is the highest.
 * @param G
 * @param ctx
 * @param winner player ID
 */
export function verifyWinner(
	G: GameData,
	ctx: Ctx,
	winner: string
): void | typeof INVALID_MOVE {
	if (findWinners(G, ctx).includes(winner)) {
		G.winner = winner;
	} else {
		return INVALID_MOVE;
	}
}
