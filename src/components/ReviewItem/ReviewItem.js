import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price} = props.product;

    const reviewItemStyle ={
        textAlign: "start",
        borderBottom: " 1px solid blue",
        marginBottom: "5px",
        paddingBottom: "5px",
        marginLeft: "200px"
    }
    return (
        <div style={reviewItemStyle}>
            <p>this is review items</p>
            <h5 className="product-name">product name: {name}</h5>
            <p>quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>

            <button className="main-button" onClick={ () => props.handleRemoveProduct(key)}>
                 Remove
            </button>
        </div>
    );
};

export default ReviewItem;