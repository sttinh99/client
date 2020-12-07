import React from 'react';
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'

function ProductItem({ product, isAdmin }) {
    //console.log(product);
    //console.log(product);
    return (
        <div className='product_card'>
            <img src={product.images.url} alt="picture" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <p>{product.description}</p>
                <span>Price: {product.prices}đ</span>
            </div>
            <BtnRender product={product} />
            <p>solded: {product.sold}</p>
        </div>
    );
}

export default ProductItem;