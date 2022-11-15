import { types } from '@babel/core';
import { Action } from '@reduxjs/toolkit';
import Card from '../model/Card';
import { Inventory } from '../model/Inventory';
import { Sale } from '../model/Sale';
import { User } from '../model/User';
import * as actionTypes from './actionTypes';

// STATE
export interface AppState {
    Cards: Card[],
    Users: User[],
    User: User,
    SelectedSeller: User,
    SelectedCard: Card,
    Inventories: Inventory[],
    ShoppingCart: Inventory[],
    IsWindowOpen: boolean,
    IsLoading: boolean,
    HotSales: Sale[],
    HotCards: Card[],
}

interface ILoginAction{
    type: typeof actionTypes.LOGIN,
    User: User,
}

interface ILogoutAction{
    type: typeof actionTypes.LOG_OUT,
}

interface IGetCard{
    type: typeof actionTypes.GET_SINGLE_CARD,
    SelectedCard: Card,
}

interface ISearchCard{
    type: typeof actionTypes.SEARCH_CARD,
    Cards: Card[]
}

interface ISearchUser{
    type: typeof actionTypes.SEARCH_USER,
    Users: User[]
}


interface IUnsetCards{
    type: typeof actionTypes.UNSET_CARDS
}


interface IUnsetUsers{
    type: typeof actionTypes.UNSET_USERS
}

interface IGetInventoriesByOwner{
    type: typeof actionTypes.GET_INVENTORIES,
    Inventories: Inventory[],
}

interface ISetSelectedSeller{
    type: typeof actionTypes.SET_SELECTED_SELLER,
    SelectedSeller: User,
}

interface IAddToCart{
    type: typeof actionTypes.ADD_TO_CART,
    item: Inventory,
}

interface IRemoveFromCart{
    type: typeof actionTypes.REMOVE_FROM_CART,
    item: Inventory,
}

interface IProcessPurchase{
    type: typeof actionTypes.PROCESS_PURSHASE,
    ShoppingCart: Inventory[]
}

interface ISetWindow{
    type: typeof actionTypes.SET_WINDOW,
}

interface IToggleLoading{
    type: typeof actionTypes.TOGGLE_LOADING,
}
interface IHotSales{
    type: typeof actionTypes.HOT_SALES,
    HotSales: Sale[],
    Cards: Card[]
}
interface IHotCards{
    type: typeof actionTypes.HOT_CARDS,
    HotCards: Card[],
}


export type IAppAction = ILoginAction
| ILogoutAction
| IGetCard
| ISearchCard
| ISearchUser
| IUnsetCards
| IUnsetUsers
| IGetInventoriesByOwner
| ISetSelectedSeller
| IAddToCart
| IRemoveFromCart
| IProcessPurchase
| ISetWindow
| IToggleLoading
| IHotSales
| IHotCards;

