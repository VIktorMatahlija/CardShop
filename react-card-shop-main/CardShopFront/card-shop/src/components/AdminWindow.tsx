import React, { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../model/Card';
import { User } from '../model/User';
import { AddCard, DeleteCard, SearchCards, ToggleWindow, UnsetUsers, UpdateCard } from '../store/action';
import { AppState } from '../store/interfaces';
import cardIconImage from '../style/card-solid.png';

interface IStateProps {
    user: User,
    card: Card,
    cards: Card[]
}

const AdminWindow: React.FC = () => {
    const dispatch = useDispatch();

    const { user, card, cards } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          user: state.User,
          card: state.SelectedCard,
          cards: state.Cards
        };
      });
      
    const [addCard, setAddCard] = useState<boolean>(true);
    const [browseCards, setBrowseCards] = useState<boolean>(false)
    const [localCard, setLocalCard] = useState<Card | null>()
    const [windowDimensions, setWindowDimensions] = useState<number>();
    
    useEffect(() => {
        setWindowDimensions(window.innerWidth)
    }, [])

    const SubmitAdd = (event: any) => {
        event.preventDefault();
        try{
            var parse: Card = {} as Card;
            parse.artist = event.target.artist.value;
            parse.cardId = event.target.cardId.value
            parse.cardName = event.target.cardName.value
            parse.expansion = event.target.expansion.value
            parse.cardText = event.target.cardText.value
            parse.rarity = event.target.rarity.value
            parse.type = event.target.type.value
            console.log(parse);
            dispatch(AddCard(dispatch, parse))

        } catch(error){
            console.log(error)
        }
    }

    const SubmitEdit = (event: any) => {
        event.preventDefault();
        try{
            localCard && dispatch(UpdateCard(dispatch, localCard))
        } catch(error){
            console.log(error)
        }
        
    }

    const cardIcon = {
        backgroundImage: `url(${cardIconImage})`,
        width: "5%",
        margin: "0 calc(5%/4)",
    } as CSSProperties

    function findCards(name: string) {
        dispatch(UnsetUsers());
        dispatch(SearchCards(dispatch, name));
    }

    const HandleSearch = (x: any) => {
        x.preventDefault();
        setLocalCard(null);
        findCards(x.target.name.value);
    };

    const Actions = (event: Card) => {
        return (
            <>
                <button onClick={() => {
                    setLocalCard(event);
                }}>Edit</button>
                <button onClick={() => {
                    dispatch(DeleteCard(dispatch, event))
                }}>Delete</button>
            </>
        )
        
    }

    const selected = {
        borderBottom: "3px solid #012169",
    } as CSSProperties;

    const unselected = {
        color: "gray"
    } as CSSProperties


    return (
        <div className='greyoutOverlay'>
            <div className='adminWindowForm'>
                <div className='windowHeader'>
                    <button style={addCard ? selected : unselected} className='windowTabButton' onClick={() => {
                        setAddCard(true);
                        setBrowseCards(false);
                    }}>Add new card</button>

                    <button style={browseCards ? selected : unselected} className='windowTabButton' onClick={() => {
                        setBrowseCards(true);
                        setAddCard(false);
                    }}>Administrate existing cards</button>

                    <button className='cancelWindowButton' onClick={() => dispatch(ToggleWindow())}>X</button>
                </div>
                
                <div className='windowContent'>
                    {addCard &&
                        <form style={{width: "50%"}} onSubmit={(e) => SubmitAdd(e)}>
                            
                            <span>
                                <label>Card name: </label>
                                <input type="text" required placeholder='Card name' name="cardName"/>
                            </span>
                            
                            <span>
                                <label>Artist: </label>
                                <input type="text" required placeholder='Artist' name="artist"/>
                            </span>

                            <span>
                                <label>Card Id: </label>
                                <input type="text" required placeholder='Card Id' name="cardId"/>
                            </span>

                            

                            <span>
                                <label>Expansion: </label>
                                <input type="text" required placeholder='Expansion' name="expansion"/>
                            </span>

                            <span>
                                <label>Card text: </label>
                                <input type="text" required placeholder='Card text' name="cardText"/>
                            </span>

                            <span>
                                <label>Rarity: </label>
                                <input type="text" required placeholder='Rarity' name="rarity"/>
                            </span>

                            <span>
                                <label>Type: </label>
                                <input type="text" required placeholder='Type' name="type"/>
                            </span>
                            
                            
                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                    }

                    {browseCards &&
                        <>
                            <div className='windowSearchBar'>
                                <form onSubmit={(e) => HandleSearch(e)}>
                                    <button className='changeButton' type="button" style={cardIcon} >&nbsp;</button>
                                    <input type="text" required placeholder={"Card Name"} name="name" className='windowInputSearch'/>
                                    <button className='submitButton' type="submit">&nbsp;</button>
                                </form>
                            </div>
                            <br/>
                        </>
                    }
                    {browseCards && (localCard ? 
                    
                    <form style={{width: "50%"}} onSubmit={(e) => SubmitEdit(e)}>
                            
                            <span>
                                <label>Card name: </label>
                                <input type="text" value={localCard.cardName} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        cardName: e.target.value
                                    })
                                } required placeholder='Card name' name="cardName"/>
                            </span>
                            
                            <span>
                                <label>Artist: </label>
                                <input type="text" value={localCard.artist} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        artist: e.target.value
                                    })
                                } required placeholder='Artist' name="artist"/>
                            </span>

                            <span>
                                <label>Card Id: </label>
                                <input type="text" value={localCard.cardId} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        cardId: e.target.value
                                    })
                                } required placeholder='Card Id' name="cardId"/>
                            </span>

                            

                            <span>
                                <label>Expansion: </label>
                                <input type="text" value={localCard.expansion} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        expansion: e.target.value
                                    })
                                } required placeholder='Expansion' name="expansion"/>
                            </span>

                            <span>
                                <label>Card text: </label>
                                <input type="text" value={localCard.cardText} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        cardText: e.target.value
                                    })
                                } required placeholder='Card text' name="cardText"/>
                            </span>

                            <span>
                                <label>Rarity: </label>
                                <input type="text" value={localCard.rarity} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        rarity: e.target.value
                                    })
                                } required placeholder='Rarity' name="rarity"/>
                            </span>

                            <span>
                                <label>Type: </label>
                                <input type="text" value={localCard.type} onChange={(e) =>
                                    setLocalCard({
                                        ...localCard,
                                        type: e.target.value
                                    })
                                } required placeholder='Type' name="type"/>
                            </span>
                            
                            
                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                    
                    :
                            <div className='adminGrid'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Card name</th>
                                        {windowDimensions! > 800 && <>
                                            <th>Artist</th>
                                            <th>CardID</th>
                                            <th>Expansion</th>
                                            <th colSpan={3}>Card Text</th>
                                            <th>Rarity</th>
                                            <th>Type</th>
                                        </>}
                                        
                                        <th>Actions</th>
                                    </tr>
                                    {cards && cards.map(x => (
                                        <tr key={x.id}>
                                            <td>{x.cardName}</td>
                                            {windowDimensions! > 800 && <>
                                                <td>{x.artist}</td>
                                                <td>{x.cardId}</td>
                                                <td>{x.expansion}</td>
                                                <td colSpan={3}>{x.cardText}</td>
                                                <td>{x.rarity}</td>
                                                <td>{x.type}</td>
                                            </>}                                            
                                            <td>{Actions(x)}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminWindow;

