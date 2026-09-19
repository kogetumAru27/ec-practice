type Props = {
    cartItems: {
        productId: string;
        quantity: number;
        product: {
            price: number;
        };
    }[];
    orderId: string;
};
export const createorderItems = ({cartItems,orderId}:Props) => {
        return cartItems.map(cart => (
            {
                orderId:orderId,
                productId:cart.productId,
                quantity:cart.quantity,
                priceAtPurchase:cart.product.price
            }
        ))

}