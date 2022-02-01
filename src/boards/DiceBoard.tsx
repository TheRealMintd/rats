import { ReactElement } from "react";

import '../styles/board.css';
import { banquetGoals } from './BanquetBoard';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const images = [
    '/dice-1.png', 
    '/dice-2.png', 
    '/dice-3.png', 
    '/dice-4.png', 
    '/dice-5.png', 
    '/dice-6.png'
];

const dice = [
    document.querySelector('#die-1'),
    document.querySelector('#die-2'),
];

export const roll = (): void => {
    dice.forEach(function(die) {
        die?.classList.add('shake');
    });
    setTimeout(function() {
        dice.forEach(function(die) {
            die?.classList.remove('shake');
        });
        const dieOneValue: number = Math.floor(Math.random() * 6);
        const dieTwoValue: number = Math.floor(Math.random() * 6);
        const total: number = dieOneValue + 1 + dieTwoValue + 1;
        document.querySelector('#die-1')?.setAttribute('src', images[dieOneValue]);
        document.querySelector('#die-2')?.setAttribute('src', images[dieTwoValue]);
        document.querySelector('#total')!.innerHTML = 'The banquet goal is ' + total.toString();
        document.querySelector(banquetGoals[total - 2])?.classList.add('shadow');
    },
    1000
    );
};

export const DiceBoard = (): ReactElement => {
    return (
        <div className='dice-container'>
            <div className='dice-wrapper'>
                <img className='dice-img' src='/dice-1.png' id='die-1'/>
                <img className='dice-img' src='/dice-2.png' id='die-2'/>
            </div>
            <p className='msg' id='total'></p>
            <button className='button-19' role='button' onClick={() => roll()}>Roll Banquet Goal</button>
        </div>
    );
};