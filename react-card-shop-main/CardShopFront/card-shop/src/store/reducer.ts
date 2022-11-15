import { Action } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import { store } from ".."
import Card from "../model/Card"
import { Inventory } from "../model/Inventory"
import { User } from "../model/User"
import * as actionTypes from "./actionTypes"
import { AppState, IAppAction } from "./interfaces"


const initialState: AppState = {
  HotCards: [],
  HotSales: [],
    Cards: [],
    Users: [],
    Inventories: [],
    ShoppingCart: [],
    User: {username: "test"} as User,
    SelectedSeller: {} as User,
    SelectedCard: {} as Card,
    IsWindowOpen: false,
    IsLoading: false,
}

const reducer = (
    state: AppState = initialState,
    action: IAppAction
  ): AppState => {
    switch (action.type) {
      case actionTypes.HOT_SALES:
        return {
          ...state,
          HotSales: action.HotSales,
          Cards: state.Cards
        }
        case actionTypes.HOT_CARDS:
          return {
            ...state,
            HotCards: action.HotCards,
          }
      case actionTypes.LOGIN:
        return {
          ...state,
          User: action.User,
        }
      
      case actionTypes.LOG_OUT:
        return {
          ...state,
          User: {} as User,
        }
  
        case actionTypes.GET_SINGLE_CARD:
          return {
            ...state,
            SelectedCard: action.SelectedCard,
          }

          case actionTypes.SEARCH_CARD:
            return {
              ...state,
              Cards: action.Cards,
          }

          case actionTypes.SEARCH_USER:
            return {
              ...state,
              Users: action.Users,
          }

          case actionTypes.UNSET_CARDS:
            return {
              ...state,
              Cards: [] as Card[],
          }

          case actionTypes.UNSET_USERS:
            return {
              ...state,
              Users: [] as User[],
          }

          case actionTypes.SET_WINDOW:
            return {
              ...state,
              IsWindowOpen: !state.IsWindowOpen,
          }
          
          case actionTypes.TOGGLE_LOADING:
            return {
              ...state,
              IsLoading: !state.IsLoading,
          }

          case actionTypes.GET_INVENTORIES:
            return{
              ...state,
              Inventories: action.Inventories,
            }

          case actionTypes.SET_SELECTED_SELLER:
            return{
              ...state,
              SelectedSeller: action.SelectedSeller,
            }

          case actionTypes.ADD_TO_CART:
            var temp: Inventory[] = state.ShoppingCart;
            action.item.amount = 1;
            temp.push(action.item);
            return{
              ...state,
              ShoppingCart: temp
            }

          case actionTypes.REMOVE_FROM_CART:
            var temp: Inventory[] = state.ShoppingCart;
            const index = temp.indexOf(action.item);
            if (index > -1) {
              temp.splice(index, 1); 
            }
            return{
              ...state,
              ShoppingCart: temp
            }

          case actionTypes.PROCESS_PURSHASE:
          return{
            ...state,
            ShoppingCart: [],
          }      
    }
    return state
  }
  
  export default reducer;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


  