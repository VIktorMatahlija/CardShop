import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../model/Card';
import { Inventory } from '../model/Inventory';
import { User } from '../model/User';
import { AddToCart, GetCard, GetInventoriesByCard, GetInventoriesByOwner, ProcessShoppingCart, RemoveFromCart, SearchCards,  SearchUsers, SetSellectedSeller, UnsetCards, UnsetUsers } from '../store/action';
import { AppState } from '../store/interfaces';


interface IStateProps {
    ShoppingCart: Inventory[],
    User: User,
}

const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch();
    const { ShoppingCart, User } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            ShoppingCart: state.ShoppingCart,
            User: state.User,
        };
      });

    var sum: number = 0;

    ShoppingCart.forEach(x => sum+= x.price)

    

    return(
        <div className='mainDiv'>
            <div className='receipt'> 
                <h1>Total: {sum}</h1>
                {ShoppingCart.length > 0 ? <button onClick={() => dispatch(ProcessShoppingCart(dispatch, User, ShoppingCart))}>Buy</button> : <p>Add items to shopping cart first!</p>}
            </div>
            <table className='shoppingCart'>
            <thead>
                <tr>
                    <th><b>Item</b></th>
                    <th><b>Seller</b></th>
                    <th><b>Price</b></th>
                    <th><b>Quantity</b></th>
                    <th><b>&nbsp;</b></th>
                </tr>
            </thead>
            <tbody>
                {ShoppingCart.map(x => (
                    <tr>
                        <td><p>{x.cardName}</p></td>
                        <td><p>{x.sellerName}</p></td>
                        <td><p>{x.price}</p></td>
                        <td><p>{x.amount}</p></td>
                        <td><button onClick={() => dispatch(RemoveFromCart(x))}>Remove</button></td>
                    </tr>
                    
                ))}
                
            </tbody>
        </table>
    </div>
    );
};

export default ShoppingCart;

