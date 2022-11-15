
import { Link, useLocation } from 'react-router-dom';
import Card from '../model/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetCard, ToggleWindow } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/interfaces';
import InventoryList from './InventoryList';
import InventoryEditor from './InventoryEditor';
import CurrencyConversion from './CurrencyCoversion';
interface IStateProps {
    card: Card,
    isWindowOpen: boolean
}
const SingleCard: React.FC= () => {
    const dispatch = useDispatch();
    const { card, isWindowOpen } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          card: state.SelectedCard,
          isWindowOpen: state.IsWindowOpen
        };
      });

    return (
        <>
            {isWindowOpen && <InventoryEditor />}
            <div className='mainDiv'>
                <div className='cardHolder' >
                    <img src={card.foreignImageURL ? card.foreignImageURL : require("../style/mtgPlaceholder.png")}  width="100%" />
                </div>
                    
                <div>                    
                    <div className='statsHolder'>
                        <h1>{card?.cardName}</h1>
                        <p>{card?.cardText}</p>
                        <hr/>
                        <p>{card?.expansion}</p>
                        <b>{card?.rarity}</b>
                        <p>{card?.artist}</p>
                        <button onClick={() => dispatch(ToggleWindow())}>Sell now</button>
                        <br/><h1>Shop now:</h1><br/>
                        <InventoryList card={card}/>
                        <CurrencyConversion/>
                    </div>
                            
                </div>
            </div>
        </>
    );
};

export default SingleCard;