import type { PlayerInventory, Resource } from "./types";

export interface Ranking {
	first: string[];
	second: string[];
	third: string[];
}

interface InternalScore {
	player: string;
	value: number;
}

export abstract class BanquetGoal {
	findWinners(playerData: PlayerInventory[]): Ranking {
		const first: InternalScore[] = [];
		const second: InternalScore[] = [];
		const third: InternalScore[] = [];

		this.findInternalScores(playerData).forEach((score) => {
			if (!first.length || score.value === first[0].value) {
				first.push(score);
			} else if (!second.length || score.value === second[0].value) {
				second.push(score);
			} else {
				third.push(score);
			}
		});

		return {
			first: first.map((score) => score.player),
			second: second.map((score) => score.player),
			third: third.map((score) => score.player),
		};
	}

	protected abstract findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[];
}

/**
 * Class representing the "Cheap" banquet goal
 *
 * Player will be ranked based on the total number of dishes and decorations that
 * they have made, disregarding the value of the dishes themselves. The player
 * with the least number of dishes + decorations wins.
 */
export class Cheap extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player) => ({
				player: player.toString(),
				value: inventory.dishes.length + inventory.decorations.length,
			}))
			.sort(({ value: a }, { value: b }) => a - b);
	}
}

/**
 * Class representing the "Composed" banquet goal
 *
 * Players will be ranked based on the number of decoration and/or dishes with
 * matching values. Players without any decoration and/or dishes with matching
 * values will not be considered for this ranking.
 */
export class Composed extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number] => [
				player,
				this.totalFreq(inventory.decorations.concat(inventory.dishes)),
			])
			.filter(([_, combined]) => combined)
			.map(([player, combined]) => ({
				player: player.toString(),
				value: combined,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}

	private totalFreq(initial: number[]): number {
		return Array.from(new Set(initial))
			.map((val) => initial.filter((v) => v === val).length)
			.filter((item) => item > 1)
			.reduce((a, b) => a + b, 0);
	}
}

/**
 * Class representing the "Greedy" banquet goal
 *
 * Players will be ranked based on the value of their largest dish. Players
 * without any dishes will not be considered for this ranking.
 */
export class Greedy extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number[]] => [
				player,
				inventory.dishes,
			])
			.filter(([_, dishes]) => dishes.length)
			.map(([player, dishes]) => ({
				player: player.toString(),
				value: Math.max(...dishes),
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Refined" banquet goal
 *
 * Player will be ranked based on the total value of dishes that
 * they have made. The player with the highest total dish value wins.
 * Players without any dishes will not be considered for this ranking.
 */
export class Refined extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number] => [
				player,
				inventory.dishes.reduce((acc, curr) => acc + curr, 0),
			])
			.filter(([_, dishes]) => dishes)
			.map(([player, dishes]) => ({
				player: player.toString(),
				value: dishes,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Generous" banquet goal.
 *
 * Players will be ranked based on the number of dishes that they have made.
 * Players without any dishes will not be considered for this ranking.
 */
export class Generous extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number[]] => [
				player,
				inventory.dishes,
			])
			.filter(([_, dishes]) => dishes.length)
			.map(([player, dishes]) => ({
				player: player.toString(),
				value: dishes.length,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Plush" banquet goal
 *
 * Players will be ranked based on the number of nests.
 * Players without any nests will not be considered for this ranking.
 */
export class Plush extends BanquetGoal {
	private static readonly resources: Resource[] = [
		"cocktailSwords",
		"baubles",
		"straw",
		"crumbs",
		"rags",
		"flowers",
	];

	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number] => [
				player,
				Plush.resources
					.map((resource) => inventory[resource].hasNest)
					.filter((i) => i).length,
			])
			.filter(([_, numNest]) => numNest)
			.map(([player, numNest]) => ({
				player: player.toString(),
				value: numNest,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Swanky" banquet goal
 *
 * Player will be ranked based on the number of decorations that
 * they have made. The player with the highest number of decorations wins.
 * Players without any decorations will not be considered for this ranking.
 */
export class Swanky extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number] => [
				player,
				inventory.decorations.length,
			])
			.filter(([_, decorations]) => decorations)
			.map(([player, decorations]) => ({
				player: player.toString(),
				value: decorations,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Dapper" banquet goal
 *
 * Player will be ranked based on the total value of decorations that
 * they have made. The player with the highest total decorations value wins.
 * Players without any decorations will not be considered for this ranking.
 */
export class Dapper extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number] => [
				player,
				inventory.decorations.reduce((acc, curr) => acc + curr, 0),
			])
			.filter(([_, decorations]) => decorations)
			.map(([player, decorations]) => ({
				player: player.toString(),
				value: decorations,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Grandiose" banquet goal
 *
 * Players will be ranked based on the value of their largest decoration.
 * Players without any decoration will not be considered for this ranking.
 */
export class Grandiose extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number[]] => [
				player,
				inventory.decorations,
			])
			.filter(([_, decorations]) => decorations.length)
			.map(([player, decorations]) => ({
				player: player.toString(),
				value: Math.max(...decorations),
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

/**
 * Class representing the "Elegant" banquet goal
 *
 * Player will be ranked based on the run of dishes/decorations value that
 * they have. The player with the longest run wins.
 * Players without any runs will not be considered for this ranking.
 */
export class Elegant extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number] => [
				player,
				this.findLongestRun(
					inventory.dishes
						.concat(inventory.decorations)
						.sort((a, b) => a - b)
				),
			])
			.filter(([_, run]) => run > 1)
			.map(([player, run]) => ({
				player: player.toString(),
				value: run,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}

	private findLongestRun(sortedArr: number[]): number {
		// each index stores the accumulated run
		const runLengths: number[] = [];
		sortedArr.forEach((ele, index) => {
			// skip the first element and compare the previous and current
			// element
			runLengths.push(
				index > 0 && ele - sortedArr[index - 1] === 1
					? runLengths[index - 1] + 1
					: 1
			);
		});
		return Math.max(...runLengths);
	}
}

/**
 * Class representing the "Dainty" banquet goal
 *
 * Players will be ranked based on the number of small decoration and dishes.
 * (value less than 3). Players without any decoration will not be considered
 * for this ranking.
 */
export class Dainty extends BanquetGoal {
	protected override findInternalScores(
		playerData: PlayerInventory[]
	): InternalScore[] {
		return playerData
			.map((inventory, player): [number, number[]] => [
				player,
				inventory.decorations
					.concat(inventory.dishes)
					.filter((i) => i <= 3),
			])
			.filter(([_, combined]) => combined.length)
			.map(([player, combined]) => ({
				player: player.toString(),
				value: combined.length,
			}))
			.sort(({ value: a }, { value: b }) => b - a);
	}
}

export const banquetGoals: BanquetGoal[] = [
	new Cheap(),
	new Composed(),
	new Greedy(),
	new Refined(),
	new Generous(),
	new Plush(),
	new Swanky(),
	new Dapper(),
	new Grandiose(),
	new Elegant(),
	new Dainty(),
];
