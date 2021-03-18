import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Header/Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    
    // for img after order placed
    const [orderPlaced, setOrderPlaced] = useState(false);

    // *****check out handle and going to shipment *******
    const history = useHistory()

    const handleCheckOut = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder([]);
         history.push('/shipment')
        
    }

    //button remove

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts)

    }, []);
    // for img
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImg} alt=""/>
    }
    return (
        <div className = "shop-container">

            <div className = "product-continer">
                {/* <h1>Cart items : {cart.length}</h1> */}
                {
                    cart.map(pd => <ReviewItem handleRemoveProduct = {handleRemoveProduct} key = {pd.key} product={pd}></ReviewItem>)
                }
                {thankYou}
                

            </div>

            <div className = "cart-container">
                <Cart cart={cart}>
                    <button className="main-button" onClick={handleCheckOut}>Check Out</button>
                </Cart>

            </div>

        </div>
    );
};

export default Review;