import {
	Cheap,
	Generous,
	Greedy,
	Refined,
	Swanky,
	Dapper,
	Elegant,
	Grandiose,
	Dainty,
	Composed,
	Plush,
} from "./banquetGoals";
import { GameData, PlayerData, PlayerInventory } from "./types";
import { defaultInventory, sortedByCocktailSwords } from "./utils";

it("correctly calculates rankings for 'Cheap'", () => {
	const players = generateTestInventory([
		{ dishes: [2, 3, 1] },
		{ decorations: [8, 100, 1] },
		{ dishes: [1], decorations: [9] },
		{},
	]);

	const result = new Cheap().findWinners(players);

	expect(result.first.sort()).toEqual(["3"]);
	expect(result.second.sort()).toEqual(["2"]);
	expect(result.third.sort()).toEqual(["0", "1"]);
});

it("correctly calculates rankings for 'Greedy'", () => {
	const players = generateTestInventory([
		{ dishes: [20, 40, 40, 40, 40, 40] },
		{ decorations: [1000] },
		{ dishes: [100] },
		{ dishes: [50, 50, 50] },
		{ dishes: [40] },
		{ dishes: [50] },
	]);

	const result = new Greedy().findWinners(players);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["3", "5"]);
	expect(result.third.sort()).toEqual(["0", "4"]);
});

it("correctly calculates rankings for 'Generous'", () => {
	const players = generateTestInventory([
		{ dishes: [20, 40, 40, 40, 40] },
		{ decorations: [1000] },
		{ dishes: [100, 100] },
		{ dishes: [50, 50, 50] },
		{ dishes: [40, 40] },
		{ dishes: [50] },
	]);

	const result = new Generous().findWinners(players);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["3"]);
	expect(result.third.sort()).toEqual(["2", "4", "5"]);
});

it("correctly calculates rankings for 'Refined'", () => {
	const players = generateTestInventory([
		{ dishes: [20, 40, 40, 40, 40] }, // 180
		{ decorations: [1000] }, // 0
		{ dishes: [100, 100] }, // 200
		{ dishes: [50, 50, 50, 50] }, // 200
		{ dishes: [40, 40] }, // 80
		{ dishes: [30, 30] }, // 60
	]);

	const result = new Refined().findWinners(players);

	expect(result.first.sort()).toEqual(["2", "3"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4", "5"]);
});

it("correctly calculates rankings for 'Swanky'", () => {
	const players = generateTestInventory([
		{ decorations: [20, 40, 40, 40, 40] }, // 5
		{ dishes: [1000] }, // 0
		{ decorations: [100, 100] }, // 2
		{ decorations: [50, 50, 50, 50] }, // 4
		{ decorations: [40, 40] }, // 2
		{ decorations: [30] }, // 1
	]);

	const result = new Swanky().findWinners(players);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["3"]);
	expect(result.third.sort()).toEqual(["2", "4", "5"]);
});

it("correctly calculates rankings for 'Dapper'", () => {
	const players = generateTestInventory([
		{ decorations: [20, 40, 40, 40, 40] }, // 180
		{ dishes: [1000] }, // 0
		{ decorations: [100, 100] }, // 200
		{ decorations: [50, 50, 50, 50] }, // 200
		{ decorations: [40, 40] }, // 80
		{ decorations: [30, 30] }, // 60
	]);

	const result = new Dapper().findWinners(players);

	expect(result.first.sort()).toEqual(["2", "3"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4", "5"]);
});

it("correctly calculates rankings for 'Elegant'", () => {
	const players = generateTestInventory([
		{ dishes: [4, 7, 9], decorations: [2, 3] }, // 3
		{ dishes: [1] }, // 1
		{ dishes: [9, 2, 8], decorations: [12, 10, 11] }, // 5
		{ decorations: [1, 2, 3] }, // 3
		{ dishes: [1, 2] }, // 2
		{ decorations: [3, 6, 9] }, // 1
	]);

	const result = new Elegant().findWinners(players);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["0", "3"]);
	expect(result.third.sort()).toEqual(["4"]);
});

it("correctly calculates rankings for 'Grandiose'", () => {
	const players = generateTestInventory([
		{ decorations: [20, 40, 40, 40, 40, 40] },
		{ dishes: [1000] },
		{ decorations: [100] },
		{ decorations: [50, 50, 50] },
		{ decorations: [40] },
		{ decorations: [50] },
	]);

	const result = new Grandiose().findWinners(players);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["3", "5"]);
	expect(result.third.sort()).toEqual(["0", "4"]);
});

it("correctly calculates rankings for 'Dainty'", () => {
	const players = generateTestInventory([
		{ decorations: [2, 3, 2, 4, 3, 2] }, //5
		{ dishes: [1000] }, //0
		{ decorations: [1] }, //1
		{ decorations: [1, 1] }, //2
		{ dishes: [1], decorations: [4] }, //1
		{ decorations: [5] }, //0
	]);

	const result = new Dainty().findWinners(players);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["3"]);
	expect(result.third.sort()).toEqual(["2", "4"]);
});

it("correctly calculates rankings for 'Composed'", () => {
	const players = generateTestInventory([
		{ decorations: [2, 2, 2, 4, 4, 2] }, //6
		{ dishes: [1000] }, //0
		{ decorations: [1] }, //0
		{ decorations: [1, 1] }, //2
		{ dishes: [4], decorations: [4] }, //2
		{ decorations: [5, 5, 2, 5] }, //3
	]);

	const result = new Composed().findWinners(players);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["5"]);
	expect(result.third.sort()).toEqual(["3", "4"]);
});

it("correctly calculates rankings for 'Plush'", () => {
	const players = generateTestInventory([
		{
			baubles: { hasNest: true, amount: 0 },
			straw: { hasNest: true, amount: 6 },
			flowers: { hasNest: false, amount: 6 },
		}, //2
		{
			baubles: { hasNest: false, amount: 0 },
			straw: { hasNest: false, amount: 6 },
			flowers: { hasNest: false, amount: 6 },
		}, //0
		{
			baubles: { hasNest: true, amount: 0 },
			straw: { hasNest: true, amount: 6 },
			flowers: { hasNest: true, amount: 6 },
		}, //3
		{ decorations: [1, 1] }, //0
		{
			baubles: { hasNest: true, amount: 0 },
			straw: { hasNest: false, amount: 6 },
			flowers: { hasNest: false, amount: 6 },
		}, //1
		{ decorations: [5, 5, 2, 5] }, //0
	]);

	const result = new Plush().findWinners(players);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4"]);
});

it("correctly calculates the play order for 'outDoCocktailSwords' phase", () => {
	const players = generateTestInventory([
		{
			cocktailSwords: { amount: 11, hasNest: false },
		},
		{
			cocktailSwords: { amount: 20, hasNest: false },
		},
		{
			cocktailSwords: { amount: 10, hasNest: false },
		},
		{
			cocktailSwords: { amount: 15, hasNest: false },
		},
		{
			cocktailSwords: { amount: 11, hasNest: false },
		},
		{
			cocktailSwords: { amount: 12, hasNest: false },
		},
	]);
	const G = {
		round: 0,
		host: ["2"],
		players,
		supplyTaken: [],
	} as unknown as GameData;

	const result = sortedByCocktailSwords(G);

	expect(result).toEqual(["1", "3", "5", "0", "4"]);
});

function generateTestInventory(
	inventoryOverrides: Partial<PlayerInventory>[]
): PlayerData {
	return Object.fromEntries(
		inventoryOverrides.map((partialInventory, player) => [
			player.toString(),
			{ ...defaultInventory(), ...partialInventory },
		])
	);
}
