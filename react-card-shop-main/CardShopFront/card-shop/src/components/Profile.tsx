import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../model/User';
import { LogOut, ToggleWindow } from '../store/action';
import { AppState } from '../store/interfaces';
import { useNavigate } from 'react-router-dom';
import InventoryList from './InventoryList';
import AdminWindow from './AdminWindow';

interface IStateProps {
    User: User,
    isWindowOpen: boolean
}

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    var navigate = useNavigate();
    const { User, isWindowOpen } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          User: state.User,
          isWindowOpen: state.IsWindowOpen
        };
      });

      useEffect(() => {
        if(User.email == null){
            navigate("/Home")
        }
      }, [User]);
    
    return (
      <>
      {isWindowOpen && <AdminWindow />}
      <div className='mainDiv'>
            <h1>{User.username}</h1>
            <hr/>
            <h2>Email: {User.email}</h2>
            <p>Address: {User.address}</p>
            <p>{User.isAdmin ? "You are an admin!" : "You are not an admin!"}</p>
            <InventoryList seller={User}/>
            <div className='profileButtons'>
              <button onClick={() => dispatch(LogOut())}>Log out</button>
              {User.isAdmin && <button onClick={() => dispatch(ToggleWindow())}>Admin options</button>}
            </div>
      </div>
      </>
    );
};

export default Profile;

