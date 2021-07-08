import { Cheap } from "./banquetGoals";
import { PlayerInventory } from "./types";
import { defaultInventory } from "./utils";

it("correctly calculates rankings for 'Cheap'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), dishes: [2, 3, 1] },
		{ ...defaultInventory(), decorations: [8, 100, 1] },
		{ ...defaultInventory(), dishes: [1], decorations: [9] },
		defaultInventory(),
	];

	const result = new Cheap().findWinners(playerData);

	expect(result.first.sort()).toEqual(["3"]);
	expect(result.second.sort()).toEqual(["2"]);
	expect(result.third.sort()).toEqual(["0", "1"]);
});
