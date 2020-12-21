import React, { useState } from 'react';
import fakeData from '../../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
// import '../Product/Product';

const Shop = () => {
    console.log(fakeData); 
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10);

    const [cart, setCart] = useState([])

    const handleAddProduct = (product) => {
        // console.log('prodduct added',product);
        const newCart = [...cart,product];
        setCart(newCart)

    }
    
    return (
        <div className="shop-container">
            <div className="product-continer">
                
                    {
                        products.map(pro => <Product product={pro}
                        handleAddProduct ={handleAddProduct}
                        ></Product>)
                    }

            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    
                </Cart>
                
                
            </div>
           
        </div>
    );
};

export default Shop;