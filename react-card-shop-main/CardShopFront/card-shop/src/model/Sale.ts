export interface Sale {
    id: string;
    sellerId: string;
    buyerId: string;
    cardId: string;
    price: number;
    saleTime: Date;
}