import React from 'react';
import BtnRender from './BtnRender'
import { useHistory } from 'react-router-dom'
// import axios from 'axios'

function ProductItem({ product, isAdmin }) {

    const history = useHistory();

    const clickDetail = (id) => {
        history.push(`/products/detail/${id}`);
    }

    if ((product.quantity === 0 || product.isDelete === true) && !isAdmin) {
        return (
            <div className='product_card sold-out'>
                <img src={product.images.url} alt="picturexxx" onClick={() => clickDetail(product._id)} />
                <div className="product_box">
                    <h2 title={product.title}>{product.title}</h2>
                    <p>{product.description}</p>
                    <span>Price: ${product.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                </div>
                Sold out
                <p>solded: {product.sold}</p>
            </div >
        );
    }
    return (
        <div className='product_card'>
            <img src={product.images.url[0]} alt="picture1" onClick={() => clickDetail(product._id)} />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <p>{product.description}</p>
                {
                    product.discount > 0 ?
                        <div className="discount-product">
                            <span>${(product.prices - (product.prices * product.discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                            <strike>${product.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strike>
                        </div> :
                        <span>${product.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                }
            </div>
            <BtnRender product={product} />
            <p>solded: {product.sold}</p>
        </div >
    );

}

export default React.memo(ProductItem);