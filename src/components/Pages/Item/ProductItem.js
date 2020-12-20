import React from 'react';
import BtnRender from './BtnRender'
import axios from 'axios'

function ProductItem({ product, isAdmin, token, callback, setCallback }) {
    //console.log(product);
    //console.log(product);
    const deleteProduct = async () => {
        try {
            const deleteProduct = await axios.post(`/products/delete/${product._id}`, {
                headers: { Authorization: token }
            })
            await deleteProduct
            setCallback(!callback)
            alert('res');
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    if (product.quantity === 0 && !isAdmin) {
        return (
            <div className='product_card sold-out'>
                <img src={product.images.url} alt="picturexxx" />
                <div className="product_box">
                    <h2 title={product.title}>{product.title}</h2>
                    <p>{product.description}</p>
                    <span>Price: {product.prices}$</span>
                </div>
                Đã Hết Hàng
                <p>solded: {product.sold}</p>
            </div >
        );
    }
    return (
        <div className='product_card'>
            <img src={product.images.url} alt="picture1" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <p>{product.description}</p>
                <span>Price: {product.prices}$</span>
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct} />
            <p>solded: {product.sold}</p>
        </div >
    );

}

export default ProductItem;