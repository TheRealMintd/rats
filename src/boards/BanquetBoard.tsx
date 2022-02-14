import { ReactElement } from "react";

import "../styles/board.css";

const banquetImages = [
	"/cheap.png",
	"/composed.png",
	"/greedy.png",
	"/refined.png",
	"/generous.png",
	"/plush.png",
	"/swanky.png",
	"/dapper.png",
	"/grandiose.png",
	"/elegant.png",
	"/dainty.png",
];

type BanquetProps = {
	banquetGoalIndexes: number[];
};

export const BanquetBoard = ({
	banquetGoalIndexes,
}: BanquetProps): ReactElement => {
	const goalImages = banquetGoalIndexes.map((index) => (
		<img key={index} className="banquet-img" src={banquetImages[index]} />
	));
	return (
		<div className="column left">
			<h1 className="heading">Banquet Goal</h1>
			<div className="banquet-wrapper">{goalImages}</div>
		</div>
	);
};
