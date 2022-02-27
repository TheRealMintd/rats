import type { BoardProps } from 'boardgame.io/react';
import { ReactElement } from 'react';

import '../styles/board.css';
import type { GameData } from '../types';
import { DiceBoard } from './DiceBoard';
import { BanquetBoard } from './BanquetBoard';
import { DecorationContainer, DishContainer } from './Containers';
import { RoundBoard } from './RoundBoard';

type RatsProps = BoardProps<GameData>;

export const Board = ({G, ctx, moves}: RatsProps): ReactElement => {

    return (
        <div className='board'>
            <h2 className='title margin-top-0 margin-btm-0'>RATS: HIGH TEA AT SEA</h2>
            <div className='row'>
                <BanquetBoard banquetGoalIndexes={G.banquetGoalIndexes}/>
                <div className="column right">
                    <RoundBoard round={G.round}/>
                </div>
            </div>
            <DiceBoard />
            <DishContainer items={[5, 10, 5, 5, 6, 7, 6, 5, 4, 3, 2, 4, 6, 1, 2, 11]}/>
            <DecorationContainer items={[5, 10, 5, 5, 6, 7, 6, 5, 4, 3, 2, 4, 6, 1, 2, 11]}/>
        </div>
    );
};
