import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../model/Card';
import { Inventory } from '../model/Inventory';
import { User } from '../model/User';
import { AddInventory, ToggleWindow } from '../store/action';
import { AppState } from '../store/interfaces';

interface IStateProps {
    user: User,
    card: Card
}

const InventoryEditor: React.FC = () => {
    const dispatch = useDispatch();

    const { user, card } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          user: state.User,
          card: state.SelectedCard
        };
      });

      const Submit = (x: any) => {
        x.preventDefault();
        try{
            
            var parse: Inventory = {} as Inventory;
            parse.ownerId = user.id;
            parse.cardId = card.id;
            parse.sellerName = user.username;
            parse.cardName = card.cardName;
            parse.amount = x.target.amount.value;
            parse.price = x.target.price.value;
            dispatch(AddInventory(dispatch, parse))
            
        } catch(error){
            console.log(error)
        }
          
    };
    
    return (
        <div className='greyoutOverlay'>
            <div className='itemWindowForm'>
                <div className='windowHeader'>
                    <span><h2>Adding item: {card.cardName}</h2></span>
                    <button className='cancelWindowButton' onClick={() => dispatch(ToggleWindow())}>X</button>
                </div>
                
                <div className='windowContent'>
                {user.email ?
                    <>
                        <form style={{width: "50%"}} onSubmit={(e) => Submit(e)}>
                            <label>Add card: {card.cardName}</label>
                            <input type="number" required placeholder="Amount" name="amount" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                            <input type="number" required placeholder="Price" name="price" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                    </> 
                    :
                    <h1>Please log in first!</h1>


                }
                </div>
            </div>
        </div>
    );
};

export default InventoryEditor;

