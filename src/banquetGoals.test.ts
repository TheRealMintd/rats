import { Cheap, Generous, Greedy, Refined } from "./banquetGoals";
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

it("correctly calculates rankings for 'Greedy'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), dishes: [20, 40, 40, 40, 40, 40] },
		{ ...defaultInventory(), decorations: [1000] },
		{ ...defaultInventory(), dishes: [100] },
		{ ...defaultInventory(), dishes: [50, 50, 50] },
		{ ...defaultInventory(), dishes: [40] },
		{ ...defaultInventory(), dishes: [50] },
	];

	const result = new Greedy().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["3", "5"]);
	expect(result.third.sort()).toEqual(["0", "4"]);
});

it("correctly calculates rankings for 'Generous'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), dishes: [20, 40, 40, 40, 40] },
		{ ...defaultInventory(), decorations: [1000] },
		{ ...defaultInventory(), dishes: [100, 100] },
		{ ...defaultInventory(), dishes: [50, 50, 50] },
		{ ...defaultInventory(), dishes: [40, 40] },
		{ ...defaultInventory(), dishes: [50] },
	];

	const result = new Generous().findWinners(playerData);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["3"]);
	expect(result.third.sort()).toEqual(["2", "4", "5"]);
});

it("correctly calculates rankings for 'Refined'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), dishes: [20, 40, 40, 40, 40] }, // 180
		{ ...defaultInventory(), decorations: [1000] }, // 0
		{ ...defaultInventory(), dishes: [100, 100] }, // 200
		{ ...defaultInventory(), dishes: [50, 50, 50, 50] }, // 200
		{ ...defaultInventory(), dishes: [40, 40] }, // 80
		{ ...defaultInventory(), dishes: [50, 30] }, // 80
	];

	const result = new Refined().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2", "3"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4", "5"]);
});
