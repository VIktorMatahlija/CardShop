import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../model/Card';
import { Inventory } from '../model/Inventory';
import { User } from '../model/User';
import { AddToCart, DeleteInventory, GetCard, GetInventoriesByCard, GetInventoriesByOwner, SearchCards,  SearchUsers, SetSellectedSeller, UnsetCards, UnsetUsers } from '../store/action';
import { AppState } from '../store/interfaces';

interface props{
    seller?: User,
    card?: Card
}

interface IStateProps {
    user: User,
    Inventories: Inventory[]
}

const InventoryList: React.FC<props> = ({seller, card}: props) => {
    const dispatch = useDispatch();
    const { Inventories, user} = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          Inventories: state.Inventories,
          user: state.User
        };
      });

    useEffect(() => {
        seller ? dispatch(GetInventoriesByOwner(dispatch, seller.id)) : dispatch(GetInventoriesByCard(dispatch, card!.id));
    }, [seller, card])

    return(
        <>
            <table style={seller ? {width: "60%"} : {width: "100%"}}>
            <thead>
                <tr>
                    <th><b>{seller ? "Card" : "Seller"}</b></th>
                    <th><b>Amount</b></th>
                    <th><b>Price</b></th>
                    <th><b>&nbsp;</b></th>
                </tr>
            </thead>
            <tbody>
                {Inventories.map(x => (
                    <tr>
                        <td><p>{seller ? x.cardName: x.sellerName}</p></td>
                        <td><p>{x.amount}</p></td>
                        <td><p>{x.price} USD</p></td>
                        {user.email ? 
                            (user.username != x.sellerName ?
                                <td><button onClick={() => dispatch(AddToCart(x))} >Add to cart</button></td> :
                                
                                <td><button onClick={() => dispatch(DeleteInventory(dispatch,x))} >Remove from sale</button></td>
                                
                            ) : <td>Log in first!</td>}
                    </tr>
                    
                ))}
            </tbody>
        </table>
        </>
    );
};

export default InventoryList;

