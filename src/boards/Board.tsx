import type { BoardProps } from 'boardgame.io/react';
import { ReactElement } from 'react';

import '../styles/board.css';
import type { GameData } from '../types';
import { DiceBoard } from './DiceBoard';
import { BanquetBoard } from './BanquetBoard';

type RatsProps = BoardProps<GameData>;

export const Board = ({G, ctx, moves}: RatsProps): ReactElement => {

    return (
        <div className='board'>
            <h1 className='title margin-btm-0'>RATS</h1>
            <h2 className='title margin-top-0'>HIGH TEA AT SEA</h2>
            <div className='row'>
                <BanquetBoard banquetGoalIndexes={G.banquetGoalIndexes}/>
            </div>
            <DiceBoard />
        </div>
    );
};
