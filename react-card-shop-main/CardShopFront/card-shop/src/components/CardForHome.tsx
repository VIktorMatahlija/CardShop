import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../model/Card';
import { Sale } from '../model/Sale';
import { User } from '../model/User';
import { HotSales } from '../store/action';
import { AppState } from '../store/interfaces';
import TopSales from './TopSales';

interface IStateProps {
    card: Card
}
const CardsForHome: React.FC = () => {
    const dispatch = useDispatch(); 
    const { card } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            card: state.SelectedCard
        };
      }); 
      console.log(card)
    return (
        <div className='mainDiv'>
            <h1>CardsForHome</h1>
            
                      
                            <div style={{height: "50px"}}><h1>{card.cardName}</h1></div>
                            <img src={card.foreignImageURL ? card.foreignImageURL : require("../style/mtgPlaceholder.png")}  width="100%" />
        
     
        </div>
    );
};

export default CardsForHome;
