import type { PlayerInventory } from "./types";

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
	abstract findWinners(playerData: PlayerInventory[]): Ranking;
}

/**
 * Class representing the "Cheap" banquet goal
 *
 * Player will be ranked based on the total number of dishes and decorations that
 * they have made, disregarding the value of the dishes themselves. The player
 * with the least number of dishes + decorations wins.
 */
export class Cheap extends BanquetGoal {
	findWinners(playerData: PlayerInventory[]): Ranking {
		const dishDecorationCount: InternalScore[] = playerData.map(
			(inventory, player) => ({
				player: player.toString(),
				value: inventory.dishes.length + inventory.decorations.length,
			})
		);
		dishDecorationCount.sort(({ value: a }, { value: b }) => a - b);

		const first: InternalScore[] = [];
		const second: InternalScore[] = [];
		const third: InternalScore[] = [];

		dishDecorationCount.forEach((score) => {
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
}
