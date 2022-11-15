import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../model/Card';
import { Inventory } from '../model/Inventory';
import { User } from '../model/User';
import { AddInventory, ToggleWindow } from '../store/action';
import { AppState } from '../store/interfaces';

interface IStateProps {
    isLoading: boolean
}

const LoadingIndicator: React.FC = () => {
    
    const { isLoading  } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            isLoading: state.IsLoading
        };
      });

     
    if(isLoading){
        return (
            <div className='greyoutOverlay'>
                {/* https://loading.io/css/ */}
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        );
    } else return(<></>)
     
};

export default LoadingIndicator;

