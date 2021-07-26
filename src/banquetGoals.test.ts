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
import { GameData, PlayerInventory } from "./types";
import { defaultInventory, sortedByCocktailSwords } from "./utils";

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
		{ ...defaultInventory(), dishes: [30, 30] }, // 60
	];

	const result = new Refined().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2", "3"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4", "5"]);
});

it("correctly calculates rankings for 'Swanky'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), decorations: [20, 40, 40, 40, 40] }, // 5
		{ ...defaultInventory(), dishes: [1000] }, // 0
		{ ...defaultInventory(), decorations: [100, 100] }, // 2
		{ ...defaultInventory(), decorations: [50, 50, 50, 50] }, // 4
		{ ...defaultInventory(), decorations: [40, 40] }, // 2
		{ ...defaultInventory(), decorations: [30] }, // 1
	];

	const result = new Swanky().findWinners(playerData);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["3"]);
	expect(result.third.sort()).toEqual(["2", "4", "5"]);
});

it("correctly calculates rankings for 'Dapper'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), decorations: [20, 40, 40, 40, 40] }, // 180
		{ ...defaultInventory(), dishes: [1000] }, // 0
		{ ...defaultInventory(), decorations: [100, 100] }, // 200
		{ ...defaultInventory(), decorations: [50, 50, 50, 50] }, // 200
		{ ...defaultInventory(), decorations: [40, 40] }, // 80
		{ ...defaultInventory(), decorations: [30, 30] }, // 60
	];

	const result = new Dapper().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2", "3"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4", "5"]);
});

it("correctly calculates rankings for 'Elegant'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), dishes: [4, 7, 9], decorations: [2, 3] }, // 3
		{ ...defaultInventory(), dishes: [1] }, // 1
		{ ...defaultInventory(), dishes: [9, 2, 8], decorations: [12, 10, 11] }, // 5
		{ ...defaultInventory(), decorations: [1, 2, 3] }, // 3
		{ ...defaultInventory(), dishes: [1, 2] }, // 2
		{ ...defaultInventory(), decorations: [3, 6, 9] }, // 1
	];

	const result = new Elegant().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["0", "3"]);
	expect(result.third.sort()).toEqual(["4"]);
});

it("correctly calculates rankings for 'Grandiose'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), decorations: [20, 40, 40, 40, 40, 40] },
		{ ...defaultInventory(), dishes: [1000] },
		{ ...defaultInventory(), decorations: [100] },
		{ ...defaultInventory(), decorations: [50, 50, 50] },
		{ ...defaultInventory(), decorations: [40] },
		{ ...defaultInventory(), decorations: [50] },
	];

	const result = new Grandiose().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["3", "5"]);
	expect(result.third.sort()).toEqual(["0", "4"]);
});

it("correctly calculates rankings for 'Dainty'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), decorations: [2, 3, 2, 4, 3, 2] }, //5
		{ ...defaultInventory(), dishes: [1000] }, //0
		{ ...defaultInventory(), decorations: [1] }, //1
		{ ...defaultInventory(), decorations: [1, 1] }, //2
		{ ...defaultInventory(), dishes: [1], decorations: [4] }, //1
		{ ...defaultInventory(), decorations: [5] }, //0
	];

	const result = new Dainty().findWinners(playerData);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["3"]);
	expect(result.third.sort()).toEqual(["2", "4"]);
});

it("correctly calculates rankings for 'Composed'", () => {
	const playerData: PlayerInventory[] = [
		{ ...defaultInventory(), decorations: [2, 2, 2, 4, 4, 2] }, //6
		{ ...defaultInventory(), dishes: [1000] }, //0
		{ ...defaultInventory(), decorations: [1] }, //0
		{ ...defaultInventory(), decorations: [1, 1] }, //2
		{ ...defaultInventory(), dishes: [4], decorations: [4] }, //2
		{ ...defaultInventory(), decorations: [5, 5, 2, 5] }, //3
	];

	const result = new Composed().findWinners(playerData);

	expect(result.first.sort()).toEqual(["0"]);
	expect(result.second.sort()).toEqual(["5"]);
	expect(result.third.sort()).toEqual(["3", "4"]);
});

it("correctly calculates rankings for 'Plush'", () => {
	const playerData: PlayerInventory[] = [
		{
			...defaultInventory(),
			baubles: { hasNest: true, amount: 0 },
			straw: { hasNest: true, amount: 6 },
			flowers: { hasNest: false, amount: 6 },
		}, //2
		{
			...defaultInventory(),
			baubles: { hasNest: false, amount: 0 },
			straw: { hasNest: false, amount: 6 },
			flowers: { hasNest: false, amount: 6 },
		}, //0
		{
			...defaultInventory(),
			baubles: { hasNest: true, amount: 0 },
			straw: { hasNest: true, amount: 6 },
			flowers: { hasNest: true, amount: 6 },
		}, //3
		{ ...defaultInventory(), decorations: [1, 1] }, //0
		{
			...defaultInventory(),
			baubles: { hasNest: true, amount: 0 },
			straw: { hasNest: false, amount: 6 },
			flowers: { hasNest: false, amount: 6 },
		}, //1
		{ ...defaultInventory(), decorations: [5, 5, 2, 5] }, //0
	];

	const result = new Plush().findWinners(playerData);

	expect(result.first.sort()).toEqual(["2"]);
	expect(result.second.sort()).toEqual(["0"]);
	expect(result.third.sort()).toEqual(["4"]);
});

it("correctly calculates the play order for 'outDoCocktailSwords' phase", () => {
	const playerData: PlayerInventory[] = [
		{
			...defaultInventory(),
			cocktailSwords: { amount: 11, hasNest: false },
		},
		{
			...defaultInventory(),
			cocktailSwords: { amount: 20, hasNest: false },
		},
		{
			...defaultInventory(),
			cocktailSwords: { amount: 10, hasNest: false },
		},
		{
			...defaultInventory(),
			cocktailSwords: { amount: 15, hasNest: false },
		},
		{
			...defaultInventory(),
			cocktailSwords: { amount: 11, hasNest: false },
		},
		{
			...defaultInventory(),
			cocktailSwords: { amount: 12, hasNest: false },
		},
	];
	const G = {
		round: 0,
		host: 2,
		playerData,
		supplyTaken: [],
	} as unknown as GameData;

	const result = sortedByCocktailSwords(G);

	expect(result).toEqual(["1", "3", "5", "0", "4"]);
});
