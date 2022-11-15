import { Action } from 'redux';
import { ThunkAction } from "redux-thunk";
import { User } from "../model/User";
import * as actionTypes from "./actionTypes"
import { requests } from "../agent";
import { AppState, IAppAction } from "./interfaces";
import Card from '../model/Card';
import { request } from 'http';
import { Inventory } from '../model/Inventory';
import { Sale } from '../model/Sale';

const apiActions = {

  login: (username: string, password: string): Promise<User> => { return requests.get("http://localhost:5000/Users/LoginUser?UsernameOrEmail=" + username + "&Password=" + password)},
  GetCard: (id:string): Promise<Card> => { return requests.get("http://localhost:5000/Cards/getCard?ID=" + id)},
  GetCards: (name: string): Promise<Card[]> => {return requests.get("http://localhost:5000/Cards/searchCard?name=" + name)},
  GetUsers: (name: string): Promise<User[]> => {return requests.get("http://localhost:5000/Users/searchUser?name=" + name)},
  GetInventoriesByOwner: (id: string): Promise<Inventory[]> => {return requests.get("http://localhost:5000/Inventories/getInventoriesByUserID?id=" + id)},
  GetInventoriesByCard: (id: string): Promise<Inventory[]> => {return requests.get("http://localhost:5000/Inventories/getInventoriesByCardID?id=" + id)},

  HotSales: (): Promise<Sale[]> => {return requests.get("https://localhost:5001/Sales/getHotSales")},
  HotCards: ():Promise<Card[]> =>{return requests.get("https://localhost:5001/Cards/getHotCards")},
  ProcessPurchase: (Cart: Sale[]) => {return requests.post("https://localhost:5001/Sales/processPurchase", Cart)},
  AddToInventory: (Inventory: Inventory) => {return requests.post("https://localhost:5001/Inventories/addItem", Inventory)},
  
  AddCard: (Card: Card) => {return requests.post("https://localhost:5001/Cards/ImportSingleCard", Card)},
  UpdateCard: (Card: Card) => {return requests.post("https://localhost:5001/Cards/UpdateCard", Card)},
  DeleteCard: (Card: Card) => {return requests.post("https://localhost:5001/Cards/DeleteCard", Card)},


  DeleteInventory: (Item: Inventory) => {return requests.post("https://localhost:5001/Inventories/DeleteInventory", Item)},

  FOREIGNGetImageURL: (CardID: string): Promise<any> => {return requests.get('https://api.scryfall.com/cards/' + CardID)},

}



export const Login = (dispatch: any, username: string, password: string): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
    try{
      dispatch(handleLogin(await apiActions.login(username, password)));
    }catch(error){
      console.log(error);
    }

    
}

 const handleLogin = (user: User): IAppAction => {
   var x = 
    {
      type: actionTypes.LOGIN,
      User: user,
    } as IAppAction;
    return x;
  }

  export const LogOut = (): IAppAction =>(
    {
      type: actionTypes.LOG_OUT
    }
  )

  export const UnsetCards = (): IAppAction =>(
    {
      type: actionTypes.UNSET_CARDS
    }
  )

  export const UnsetUsers = (): IAppAction =>(
    {
      type: actionTypes.UNSET_USERS
    }
  )


export const GetCard = (dispatch: any, id:string): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    var Card = await apiActions.GetCard(id);
    try{
      var response = await apiActions.FOREIGNGetImageURL(Card.cardId)
      Card.foreignImageURL = response.image_uris.normal.toString();
    }
    catch(error){
      console.log(error);
    }
    dispatch(handleGetCard(Card));
  }catch(error){
    console.log(error);
  }

  
}

const handleGetCard = (card: Card): IAppAction => {
 var x = 
  {
    type: actionTypes.GET_SINGLE_CARD,
    SelectedCard: card,
  } as IAppAction;
  return x;
}

export const SearchCards = (dispatch: any, name: string): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  dispatch(ToggleLoading());
  try{
    var Cards = await apiActions.GetCards(name);
    for(var i = 0; i < Cards.length; i++){
      try{
        var response = await apiActions.FOREIGNGetImageURL(Cards[i].cardId)
        
        Cards[i].foreignImageURL = response.image_uris.normal.toString();
        console.log(Cards[i].foreignImageURL);
      }
      catch(error){
        console.log(error);
      }
    }

    dispatch(handleGetCards(Cards));
    dispatch(ToggleLoading());
  }catch(error){
    console.log(error);
  }

  
}

const handleGetCards = (cards: Card[]): IAppAction => {
 var x = 
  {
    type: actionTypes.SEARCH_CARD,
    Cards: cards,
  } as IAppAction;
  return x;
}

export const SearchUsers = (dispatch: any, name: string): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    dispatch(ToggleLoading());
    dispatch(handleGetUsers(await apiActions.GetUsers(name)));
    dispatch(ToggleLoading());
  }catch(error){
    console.log(error);
  }

  
}

const handleGetUsers = (users: User[]): IAppAction => {
 var x = 
  {
    type: actionTypes.SEARCH_USER,
    Users: users,
  } as IAppAction;
  return x;
}


export const GetInventoriesByOwner = (dispatch: any, id:string): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    dispatch(handleGetInventories(await apiActions.GetInventoriesByOwner(id)));
  }catch(error){
    console.log(error);
  }  
}

export const GetInventoriesByCard = (dispatch: any, id:string): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    dispatch(handleGetInventories(await apiActions.GetInventoriesByCard(id)));
  }catch(error){
    console.log(error);
  }  
}
export const HotSales = (dispatch: any): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    dispatch(handleHotSales(await apiActions.HotSales()));
  }catch(error){
    console.log(error);
  }  
}
const handleHotSales = (sales: Sale[]): IAppAction =>{
  var y = {
    type: actionTypes.HOT_SALES,
    HotSales: sales,
  } as IAppAction;
  return y;
}
export const HotCards = (dispatch: any): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  var Cards = await apiActions.HotCards();
  try{
    for(var i = 0; i < Cards.length; i++){
      try{
        var response = await apiActions.FOREIGNGetImageURL(Cards[i].cardId)
        
        Cards[i].foreignImageURL = response.image_uris.normal.toString();
        console.log(Cards[i].foreignImageURL);
      }
      catch(error){
        console.log(error);
      }
    }
    dispatch(handleHotCards(Cards));
  }catch(error){
    console.log(error);
  }  
}
const handleHotCards = (cards: Card[]): IAppAction =>{
  var y = {
    type: actionTypes.HOT_CARDS,
    HotCards: cards
  } as IAppAction
  return y
}
const handleGetInventories = (inventories: Inventory[]): IAppAction => {
  console.log(inventories);
 var x = 
  {
    type: actionTypes.GET_INVENTORIES,
    Inventories: inventories,
  } as IAppAction;
  return x;
}


export const SetSellectedSeller = (seller: User): IAppAction =>(
  {
    type: actionTypes.SET_SELECTED_SELLER,
    SelectedSeller: seller
  }
)

export const ToggleWindow = (): IAppAction =>(
  {
    type: actionTypes.SET_WINDOW
  }
)

export const ToggleLoading = (): IAppAction =>(
  {
    type: actionTypes.TOGGLE_LOADING
  }
)


export const AddToCart = (item: Inventory) : IAppAction =>(
  {
    type: actionTypes.ADD_TO_CART,
    item: item
  }
)

export const RemoveFromCart = (item: Inventory) : IAppAction =>(
  {
    type: actionTypes.REMOVE_FROM_CART,
    item: item
  }
)

export const ProcessShoppingCart = (dispatch: any, Buyer: User, Cart: Inventory[]): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  dispatch(ToggleLoading());
  try{
    
    var Sales: Sale[] = [];
    var temp: Sale = {} as Sale;
    temp.saleTime = new Date(Date.now());
    Cart.forEach(item => {
      temp.buyerId = Buyer.id;
      temp.price = item.price;
      temp.sellerId = item.ownerId;
      temp.cardId = item.cardId;
      temp.price = item.price;
      Sales.push(temp)
    })
    console.log(Sales);
    dispatch(handlePurchase(await apiActions.ProcessPurchase(Sales)));
  }catch(error){
    console.log(error);
  }
  dispatch(ToggleLoading());
}

export const AddInventory = (dispatch: any, Inventory: Inventory): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    await apiActions.AddToInventory(Inventory);
    dispatch(ToggleWindow());
  }catch(error){
    console.log(error);
  }  
}

export const AddCard = (dispatch: any, Card: Card): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    await apiActions.AddCard(Card);
    dispatch(ToggleWindow());
  }catch(error){
    console.log(error);
  }  
}

export const UpdateCard = (dispatch: any, Card: Card): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    await apiActions.UpdateCard(Card);
    dispatch(ToggleWindow());
  }catch(error){
    console.log(error);
  }  
}

export const DeleteCard = (dispatch: any, Card: Card): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    await apiActions.DeleteCard(Card);
    dispatch(ToggleWindow());
  }catch(error){
    console.log(error);
  }  
}

export const DeleteInventory = (dispatch: any, Item: Inventory): ThunkAction<void, AppState, unknown, Action<string>> => async() => {
  
  try{
    await apiActions.DeleteInventory(Item);
  }catch(error){
    console.log(error);
  }  
}





const handlePurchase = (sales: Sale[]): IAppAction => {
 var x = 
  {
    type: actionTypes.PROCESS_PURSHASE,
  } as IAppAction;
  return x;
}

  




