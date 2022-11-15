interface Card {
    id: string,
    cardName: string,
    cardText: string,
    type: string,
    expansion: string,
    rarity: string,
    artist: string,
    cardId:string,
    foreignImageURL?: string,
}


export default Card;