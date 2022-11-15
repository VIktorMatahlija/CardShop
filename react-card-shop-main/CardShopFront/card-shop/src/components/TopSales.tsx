import axios from 'axios';
import { stat } from 'fs';
import { request } from 'https';
import { castDraft } from 'immer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../model/Card';
import { Sale } from '../model/Sale';
import { User } from '../model/User';
import { GetCard, HotSales } from '../store/action';
import { AppState } from '../store/interfaces';
import CardsForHome from './CardForHome';

interface IStateProps {
    sales: Sale[],
    cards: Card[]
}
const TopSales: React.FC = () => {
    const dispatch = useDispatch(); 
    const { sales, cards } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            sales: state.HotSales,
            cards: state.HotCards
        };
      }); 
      console.log(sales)
    console.log(cards)
    console.log()
     return (
        <div className='mainDiv'>
            <h1>Hot Cards</h1>
            {cards && cards.map((x:Card)=>(
                <div key={x.id} className="cardHolder">
                <Link to="/SingleCard" onClick={()=>(dispatch(GetCard(dispatch, x.id)))} state={x.id}>
                    <div style={{height: "50px"}}><h1>{x.cardName}, sold for price:{sales.filter(s=>s.cardId==x.id)[0].price} USD</h1></div>
                    <img src={x.foreignImageURL ? x.foreignImageURL : require("../style/mtgPlaceholder.png")}  width="100%"></img>
                </Link>
            </div>
            )

            )}
        </div>
    );
};

export default TopSales;



