import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,product) => total + product.price, 0)
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
         total = total + product.price;
    }

    let shipping = 0;
    if(total > 15){
        shipping = 4.99; 
    }
    else if(total >0){
        shipping = 12.99;
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    // const formateNumber = num => {
    //     const fullDigit = num.toFixed(2)
    //     return Number(fullDigit);
    // }
    function formateTotla (num){
        const fullNum = num.toFixed(2)
        return Number(fullNum)
    }
    
    return (
        <div>

            <h4>Order Summery </h4>
            <p>Items Orders: {cart.length}</p>
            <p>Product Price: {formateTotla(total)}</p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p><small>Shipping Cost: {shipping}</small> </p>
            <h5>Total Price: {grandTotal}</h5>
        </div>
    );
};

export default Cart;