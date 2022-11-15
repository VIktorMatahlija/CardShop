import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import { User } from '../model/User';
import { AppState } from '../store/interfaces';

interface IStateProps {
    User: User,
}




const Header: React.FC = () => {

    const { User } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          User: state.User
        };
      });

    const [windowDimensions, setWindowDimensions] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    useEffect(() => {
        setWindowDimensions(window.innerWidth)
    }, [])

      const LinkContainer = () => {
        return(
            <div className='headerLinks'>
                <input id="menu-toggle" type="checkbox" />
                <label className='menu-button-container' htmlFor="menu-toggle">
    <div className='menu-button'></div>
  </label>
                <ul className='menu'>
                {!User.email &&
                    <>
                        <li><Link to="/Login">Login </Link></li>
                        <li><Link to="/Register">Register </Link></li>
                    </>
                }
    
                {User.email &&
                    <>
                        <li><Link to="/Profile"> {User.username} </Link></li>
                    </>
                }
                
                <li><Link to="/Search">Search </Link></li>
                <li><Link to="/ShoppingCart">Shopping Cart </Link></li>
                
                </ul> 
                </div>
        );
    }

    return (
        <>
            <div className='headerBar'>
            
                {/* Linkovi moraju biti ugniježdeni u <BrowserRouter> komponenti, ovo radi zato što smo ispravno ugnijezdili header komponentu u app komponenti */}
                <Link to="/Home" className='headerImage'> &nbsp; </Link>
                <div style={{width: "50%"}}></div>
                
                {windowDimensions! <= 800 ?
                
                    <>
                        <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                    </>
                    
                :
                    LinkContainer()}
                
            </div>

            
            <div style={ isOpen ? {height: "16vh"} : {height: "0vh"}} className='mobileMenu'>
                {windowDimensions! <= 800 && LinkContainer()}
            </div>


        </>
    );
};

export default Header;