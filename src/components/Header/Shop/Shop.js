import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
// import '../Product/Product';

const Shop = () => {
    // console.log(fakeData); 
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10);

    const [cart, setCart] = useState([])


    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey)
            product.quantity = savedCart[pdKey];
            return product;
        })
        setCart(previousCart);
    },[])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // const newCart = [...cart, product];
        setCart(newCart)
        // const sameProduct = newCart.filter(pd => pd.key === product.key)
        // const count = sameProduct.length;
        addToDatabaseCart(product.key, count)

    }
    
    return (
        <div className="shop-container">
            <div className="product-continer">
                
                    {
                        products.map(pro => 
                        <Product product={pro}
                            key={pro.key}
                            showAddToCart={true}
                          handleAddProduct ={handleAddProduct}
                        ></Product>)
                    }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"> 
                <button className="main-button">Review Order</button> 
                 </Link>
                </Cart>
                
                
            </div>
           
        </div>
    );
};

export default Shop;