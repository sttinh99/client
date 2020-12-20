import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import ProductItem from '../Item/ProductItem'

function DetailProduct() {
    const idProduct = useParams();
    const state = useContext(GlobalState);
    const addCart = state.UserAPI.addCart;
    const [products] = state.ProductAPI.products;
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (idProduct) {
            products.forEach(product => {
                //console.log(product);
                if (product._id === idProduct.id) setDetailProduct(product);
            })
        }
    }, [idProduct.id, products, idProduct])
    console.log(detailProduct);
    if (detailProduct.length === 0) return null
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row-dt">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.category}</h6>
                    </div>
                    <span className="infor">{detailProduct.content}</span>
                    <div className="row-price">
                        <p>Price: {detailProduct.prices}đ</p>
                        <span>{`quantity: ${detailProduct.quantity}`}</span>
                    </div>
                    <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>Buy Now</Link>
                </div>
            </div>
            <div className="related-products">
                <h2>Products Related</h2>
                <div className="products">
                    {
                        products.map(product => {
                            //console.log(limitRelated);
                            if (product.category === detailProduct.category && product.isDelete === false) {
                                return <ProductItem key={product._id} product={product} />
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default DetailProduct;