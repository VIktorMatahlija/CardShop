import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../model/User';
import { HotCards, HotSales } from '../store/action';
import { AppState } from '../store/interfaces';
import TopSales from './TopSales';


const Home: React.FC = () => {
    const dispatch = useDispatch(); 
    dispatch(HotSales(dispatch)) ;
    dispatch(HotCards(dispatch))
    return (
        <div className='mainDiv'>
            <TopSales></TopSales>
        </div>
    );
};

export default Home;

