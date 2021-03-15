import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import ProductItem from '../Item/ProductItem'
import RenderContent from './RenderContent'

function DetailProduct() {
    let count = 0;
    let componentItem = [];
    let desItem = [];
    const idProduct = useParams();
    const state = useContext(GlobalState);
    const addCart = state.UserAPI.addCart;
    // const [products] = state.ProductAPI.products;
    const [allproducts] = state.ProductAPI.allproducts
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (idProduct) {
            allproducts.forEach(product => {
                //console.log(product);
                if (product._id === idProduct.id) setDetailProduct(product);
            })
        }
    }, [idProduct.id, allproducts, idProduct])
    // console.log(detailProduct);
    if (detailProduct.length === 0) return null
    const showContent = (objects) => {
        console.log(objects);
        for (let key in objects) {
            componentItem.push(key)
            desItem.push(objects[key])
        }
    }
    showContent(detailProduct.content)
    return (
        <div className='boxx-detail'>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row-dt">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.category}</h6>
                    </div>
                    <h3 className="warranty">warranty: {detailProduct.warranty}</h3>
                    {
                        detailProduct.content ?
                            <div className="content">
                                <span className="infor">Infor Products ---></span>
                                <table>
                                    <thead className="show-content">
                                        <tr>
                                            <th>Component</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <RenderContent desItem={desItem} componentItem={componentItem} />
                                </table>
                            </div> : <div className="content">
                                <h3>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</h3>
                            </div>
                    }
                    <div className="row-price">
                        <p>Price: ${detailProduct.prices}</p>
                    </div>
                    {detailProduct.isDelete === true ? <p>Sold out</p> :
                        <Link to="/cart" className="cart-buy" onClick={() => addCart(detailProduct)}>Buy Now</Link>}
                </div>
            </div>
            <div className="related-products">
                <h2>Products Related</h2>
                <div className="products">
                    {
                        allproducts.map(product => {
                            //console.log(limitRelated);
                            if (product.category === detailProduct.category && product.isDelete === false && product._id !== detailProduct._id) {
                                count++;
                                if (count >= 6) return null
                                return <ProductItem key={product._id} product={product} />
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;