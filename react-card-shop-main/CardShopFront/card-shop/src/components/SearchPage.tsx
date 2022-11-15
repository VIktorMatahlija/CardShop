import axios from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../model/Card';
import { User } from '../model/User';
import { GetCard, SearchCards,  SearchUsers, SetSellectedSeller, ToggleLoading, UnsetCards, UnsetUsers } from '../store/action';
import { AppState } from '../store/interfaces';
import cardIconImage from '../style/card-solid.png';
import userIconImage from '../style/person-solid.png';

interface IStateProps {
    Users: User[],
    Cards: Card[],
}

const SearchPage: React.FC = () => {
    const dispatch = useDispatch();


    const { Users, Cards } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            Users: state.Users,
            Cards: state.Cards
        };
      });
    


    const [isCardSearch, setIsCardSearch] = useState<Boolean>(true);

    function findCards(name: string) {
        dispatch(UnsetUsers());
        dispatch(SearchCards(dispatch, name));
        
    }

    function findUsers(name: string) {
        dispatch(UnsetCards());
        dispatch(SearchUsers(dispatch, name));
    }

    const HandleSearch = (x: any) => {
        x.preventDefault();
        isCardSearch ? findCards(x.target.name.value) : findUsers(x.target.name.value);
    };

    const cardStyle = {
        width: "80%"
    } as CSSProperties;

    const userStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    } as CSSProperties;

    const userIcon = {backgroundImage: `url(${userIconImage})`} as CSSProperties
    const cardIcon = {backgroundImage: `url(${cardIconImage})`} as CSSProperties
    
    return (
        <div className='mainDiv'>
        

            <form className='regularForm'  onSubmit={(e) => HandleSearch(e)}>
                <label>{isCardSearch ? "Card Search" : "User Search"}</label><br/>
                <div>
                    <button className='changeButton' type="button" style={isCardSearch ? cardIcon : userIcon} onClick={() => setIsCardSearch(!isCardSearch)}>&nbsp;</button>
                    <input type="text" required placeholder={isCardSearch ? "Card Name" : "User Name"} name="name" className='inputSearch'/>
                    <button className='submitButton' type='submit'>&nbsp;</button>
                </div>

            </form>


            <div style={Cards ? cardStyle : userStyle}>
                {Cards && Cards.map((x: Card) => (
                    <div key={x.id} className="cardHolder">
                        <Link to="/SingleCard" onClick={()=>(dispatch(GetCard(dispatch, x.id)))} state={x.id}>
                            <div style={{height: "50px"}}><h1>{x.cardName}</h1></div>
                            <img src={x.foreignImageURL ? x.foreignImageURL : require("../style/mtgPlaceholder.png")}  width="100%" />
                        </Link>
                    </div>
                ))}

                {Users && Users.map((x: User) => (
                    <>
                    <div key={x.id} className="sellerRow">
                        <span style={{textAlign: "left"}}><Link to="/SellerPage" state={x.id} onClick={() => (dispatch(SetSellectedSeller(x)))}><h1>{x.username}</h1></Link></span>
                        <span><p>{x.email}</p></span>
                        <span><p>{x.address}</p></span>
                        <span><b>ID: </b> {x.id}</span>
                    </div>
                    </>
                ))}
            </div>      
        </div>
    );
};

export default SearchPage;

