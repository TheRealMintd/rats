import React, { ReactElement } from "react";

import "../styles/board.css";
import styles from "../styles/item.module.css";

type ContainerProps = {
	items: number[];
};

export const DishContainer = ({ items }: ContainerProps): ReactElement => {
	const shape = (
		<circle cx="50%" cy="50%" r="24" fill="none" stroke="black" />
	);

	return <ItemContainer title="Dishes" items={items} shape={shape} />;
};

export const DecorationContainer = ({
	items,
}: ContainerProps): ReactElement => {
	const shape = (
		<rect
			x="7.5"
			y="7.5"
			width="35"
			height="35"
			fill="none"
			stroke="black"
			transform="rotate(45, 25, 25)"
		/>
	);

	return <ItemContainer title="Decorations" items={items} shape={shape} />;
};

type ItemContainerProps = {
	title: string;
	items: number[];
	shape: ReactElement;
};

const ItemContainer = (props: ItemContainerProps): ReactElement => {
	const items = props.items.map((item) => (
		<Item shape={props.shape}>{item}</Item>
	));

	return (
		<div className={styles.container}>
			<h1 className="heading">{props.title}</h1>
			<div className={styles.itemContainer}>{items}</div>
		</div>
	);
};

type ItemProps = {
	shape: ReactElement;
	children: React.ReactNode;
};

const Item = (props: ItemProps): ReactElement => {
	return (
		<svg className={styles.item}>
			{props.shape}
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="central"
				fill="black"
			>
				{props.children}
			</text>
		</svg>
	);
};
