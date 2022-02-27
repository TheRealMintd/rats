import React from "react";

import "../styles/board.css";

export class DiceBoard extends React.Component {
	private diceOne: React.RefObject<HTMLImageElement>;
	private diceTwo: React.RefObject<HTMLImageElement>;
	private total: React.RefObject<HTMLParagraphElement>;

	constructor(props: Record<string, never>) {
		super(props);
		this.diceOne = React.createRef();
		this.diceTwo = React.createRef();
		this.total = React.createRef();
	}

	private roll(): void {
		this.diceOne.current?.classList.add("shake");
		this.diceTwo.current?.classList.add("shake");

		setTimeout(() => {
			this.diceOne.current?.classList.remove("shake");
			this.diceTwo.current?.classList.remove("shake");

			const dieOneValue = Math.floor(Math.random() * 6) + 1;
			const dieTwoValue = Math.floor(Math.random() * 6) + 1;
			this.diceOne.current?.setAttribute(
				"src",
				`/dice-${dieOneValue}.png`
			);
			this.diceTwo.current?.setAttribute(
				"src",
				`/dice-${dieTwoValue}.png`
			);

			const total = dieOneValue + dieTwoValue;
			const paragraph = this.total.current;
			if (paragraph) {
				paragraph.textContent = `The banquet goal is ${total}`;
			}
		}, 1000);
	}

	override render(): React.ReactNode {
		return (
			<div className="main-container">
				<div className="dice-container">
					<div className="dice-wrapper">
						<img
							className="dice-img"
							src="/dice-1.png"
							ref={this.diceOne}
						/>
						<img
							className="dice-img"
							src="/dice-2.png"
							ref={this.diceTwo}
						/>
					</div>
					<button
						className="button-19"
						role="button"
						onClick={() => this.roll()}
					>
						Roll Dice
					</button>
				</div>
				<div>
					<p className="msg" ref={this.total}></p>
				</div>
			</div>
		);
	}
}
