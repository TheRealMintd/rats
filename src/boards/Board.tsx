import type { BoardProps } from 'boardgame.io/react';
import { ReactElement } from 'react';

import '../styles/board.css';
import type { GameData } from '../types';
import { DiceBoard } from './DiceBoard';
import { BanquetBoard } from './BanquetBoard';
import { DecorationContainer, DishContainer } from './Containers';

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
            <DishContainer items={[5, 10, 5, 5, 6, 7, 6, 5, 4, 3, 2, 4, 6, 1, 2, 11]}/>
            <DecorationContainer items={[5, 10, 5, 5, 6, 7, 6, 5, 4, 3, 2, 4, 6, 1, 2, 11]}/>
        </div>
    );
};
