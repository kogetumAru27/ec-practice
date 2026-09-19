type Props = {
    product:{price:number}
    quantity:number,
}
export const calculateCartTotal = (cartItems:Props[]) => {
    return cartItems.reduce((sum,item) => sum + item.product.price * item.quantity,0 )
}