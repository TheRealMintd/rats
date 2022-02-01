import { ReactElement } from 'react';

import '../styles/board.css';

const banquetImages = [
    '/cheap.png',
    '/composed.png',
    '/greedy.png',
    '/refined.png',
    '/generous.png',
    '/plush.png',
    '/swanky.png',
    '/dapper.png',
    '/grandiose.png',
    '/elegant.png',
    '/dainty.png',
];

export const banquetGoals = [
    '#cheap',
    '#composed',
    '#greedy',
    '#refined',
    '#generous',
    '#plush',
    '#swanky',
    '#dapper',
    '#grandiose',
    '#elegant',
    '#dainty',
];

export const BanquetBoard = (): ReactElement => {

    return (
        <div className='row'>
            <div className='column left'>
                <h1 className='heading'>Banquet Goal</h1>
                <div className='banquet-wrapper'>
                    <img className='banquet-img' src={banquetImages[0]} id='cheap'/>
                    <img className='banquet-img' src={banquetImages[1]} id='composed'/>
                    <img className='banquet-img' src={banquetImages[2]} id='greedy'/>
                    <img className='banquet-img' src={banquetImages[3]} id='refined'/>
                    <img className='banquet-img' src={banquetImages[4]} id='generous'/>
                </div>
                <div className='banquet-wrapper'>
                    <img className='banquet-img' src={banquetImages[5]} id='plush'/>
                    <img className='banquet-img' src={banquetImages[6]} id='swanky'/>
                    <img className='banquet-img' src={banquetImages[7]} id='dapper'/>
                    <img className='banquet-img' src={banquetImages[8]} id='grandiose'/>
                    <img className='banquet-img' src={banquetImages[9]} id='elegant'/>
                    <img className='banquet-img' src={banquetImages[10]} id='dainty'/>
                </div>
            </div>
        </div>
    );
};
