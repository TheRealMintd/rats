import type { BoardProps } from 'boardgame.io/react';
import { ReactElement } from 'react';

import '../styles/board.css';
import type { GameData } from '../types';
import { BanquetGoalBoard } from './BanquetGoalBoard';

type RatsProps = BoardProps<GameData>;

export const Board = ({G, ctx, moves}: RatsProps): ReactElement => {

    return (
        <div className='board'>
            <BanquetGoalBoard />
        </div>
    );
};