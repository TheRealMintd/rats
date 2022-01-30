import type { BoardProps } from 'boardgame.io/react';
import { ReactElement } from 'react';

import './styles/board.css';
import type { GameData } from './types';
import { roll } from './utils/script';

type RatsProps = BoardProps<GameData>;

export const Board = ({G, ctx, moves}: RatsProps): ReactElement => {
    const pickGoal = (index: number) => moves.pickBanquetGoal(index);

    return (
        <div className='board'>
            <div className='dice-container'>
                <div className='dice-wrapper'>
                    <img className='dice-img' src='/dice-1.png' id='die-1'/>
                    <img className='dice-img' src='/dice-2.png' id='die-2'/>
                </div>
                <p className='msg' id='total'></p>
                <button className='button-19' role='button' onClick={() => roll()}>Roll Banquet Goal</button>
            </div>
        </div>
    );
};
