import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../model/User';
import { GetInventoriesByOwner, LogOut } from '../store/action';
import { AppState } from '../store/interfaces';
import { useNavigate } from 'react-router-dom';
import { Inventory } from '../model/Inventory';
import InventoryList from './InventoryList';


interface IStateProps {
    SellectedSeller: User
}

const SellerPage: React.FC = () => {
    const dispatch = useDispatch();
    const { SellectedSeller } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          SellectedSeller: state.SelectedSeller
        };
      });
    
    

    
    return (
      <div className='mainDiv'>
        <div><h1>{SellectedSeller.username}</h1></div>
        
        <hr/>
        
        <InventoryList seller={SellectedSeller}/>    
      </div>
    );
};

export default SellerPage;

