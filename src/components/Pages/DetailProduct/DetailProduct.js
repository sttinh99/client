import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { GlobalState } from '../../GlobalState'

import RenderContent from './RenderContent'
import Comments from '../Comments/Comments'
import CommentItem from '../CommentItem/CommentItem'
import Rating from '../Rating/Rating'
import Loading from '../../Loadding/Loadding'
import ProductItem from '../Item/ProductItem'
import "./detail_image_list.css"


function DetailProduct() {
    let count = 0;
    let componentItem = [];
    let desItem = [];
    const idProduct = useParams();
    const state = useContext(GlobalState);
    // const [products] = state.ProductAPI.products;
    const addCart = state.UserAPI.addCart;
    const [allproducts] = state.ProductAPI.allproducts
    const [user] = state.UserAPI.user
    const [token] = state.token
    const socket = state.socket

    const [detailProduct, setDetailProduct] = useState([])
    const [comments, setCommnets] = useState([])
    const [rating, setRating] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [rProducts, setRProducts] = useState([]);
    const [img_detail,setImg_detail]=useState([])
    useEffect(() => {
        const getRProducts = async () => {
            const res = await axios(`https://recommend-api-system.herokuapp.com/recommend/${idProduct.id}`)
            const takeO = res.data.map((item) => {
                return allproducts.find(itemC => item === itemC._id)
            })
            setRProducts(takeO);
        }
        getRProducts();
    }, [idProduct, allproducts])
    useEffect(() => {
        if (idProduct) {
            if (idProduct) {
                allproducts.forEach(product => {
                    if (product._id === idProduct.id) {
                        setDetailProduct(product);
                        setImg_detail(product.images.url[0])
                    }
                })
            }
        }
    }, [idProduct.id, allproducts, idProduct])
    useEffect(() => {
        try {
            const getComments = async () => {
                const res = await axios.get(`/comments/${idProduct.id}?limit=${page * 5}`);
                setCommnets(res.data.results);
            }
            getComments();
            setLoading(true);
        } catch (error) {
            return alert(error)
        }
    }, [idProduct.id, page])
    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', idProduct.id)
        }
    }, [socket, idProduct.id])
    useEffect(() => {
        if (socket) {
            socket.on('sendComment', msg => {
                setCommnets([msg, ...comments])
            })
            return () => socket.off('sendComment');
        }
    }, [socket, comments])
    useEffect(() => {
        if (socket) {
            socket.on("replyComment", data => {
                const newArr = [...comments];
                newArr.map(item => {
                    if (item._id === data.id) {
                        item.reply.push(data);
                    }
                    return true;
                })
                setCommnets(newArr)
            })
            return () => socket.off("replyComment");
        }

    }, [socket, comments])
    const showContent = (objects) => {
        for (let key in objects) {
            componentItem.push(key)
            desItem.push(objects[key])
        }
    }
    showContent(detailProduct.content)

    const loadMore = () => {
        setLoading(false)
        setPage(page + 1);
    }
    const hideCmt = () => {
        setLoading(false)
        setPage(1);
    }
    if (detailProduct.length === 0) return <Loading />
    return (
        <div className='boxx-detail'>
            <div className="dt-product">
                <div className="detail">
                    <div className="img-infor">
                       <div className="_img-detail-list">
                            <img className="img" src={img_detail} alt="" />
                            <ul className="image-list-detail">
                                {detailProduct.images.url.map((e,index)=>{
                                    return (<li key={index} className="_img-detail" onClick={()=>setImg_detail(e)}>
                                        <img src={e} alt="piture"/>
                                    </li>)
                                })}
                            </ul>
                       </div>
                        <div className="box-detail">
                            <p className="tt">{detailProduct.title}</p>
                            <div className="loai">
                                <p>Category: </p>
                                <p className="ct">{detailProduct.category}</p>
                            </div>
                            <p className="only">Only {detailProduct.quantity} products left</p>
                            <div className="row-price">
                                {detailProduct.discount > 0 ?
                                    <p>Price: ${(detailProduct.prices - (detailProduct.prices * detailProduct.discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                        &emsp;<strike style={{ fontWeight: "100", color: "#777", opacity: "0.5" }}> Old price: ${detailProduct.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strike></p> :
                                    <p>Price: ${detailProduct.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>}
                                {/* <h3 className="warranty">warranty: {detailProduct.warranty}</h3> */}
                            </div>
                            {detailProduct.isDelete === true ? <span className="sold-out">Sold out</span> :
                                <Link to="/cart" className="cart-buy" onClick={() => addCart(detailProduct)}>Buy Now</Link>}
                            <div className="review">
                                <span>Rating: <Rating product={detailProduct} />( {detailProduct.totalReview} review)</span>
                            </div>
                            <p className="warranty">warranty: {detailProduct.warranty}</p>
                            <div className="hr"></div>
                        </div>
                    </div>
                    <div className="policy">
                        <p className="pl1">Product delivered quickly</p>
                        <div className="hr"></div>
                        <p className="pl2">Sales policy</p>
                        <p className="pl3">- 100% genuine guarantee</p>
                        <p className="pl3">- Return within 10 days if the product is defective</p>
                        <p className="pl2">Other services</p>
                        <p className="pl3">- Computer and laptop cleaning</p>
                        <p className="pl3">- Quick warranty</p>
                    </div>
                </div>
            </div>
            {
                detailProduct.content ?
                    <div className="content">
                        <div className="content-compare">
                            <span className="infor">Description</span>
                            <p>{detailProduct.description}</p>
                        </div>
                        <div className="content-1">
                            <span className="infor">Specifications</span>
                            <table>
                                <thead className="show-content">
                                    <tr>
                                        <th>Component</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <RenderContent desItem={desItem} componentItem={componentItem} />
                            </table>
                        </div>
                    </div> :
                    <div className="content">
                        <div className="content-1">
                            <span className="infor">Description</span>
                            <p>
                                {detailProduct.description}
                            </p>
                        </div>
                    </div>
            }
            <div className="related-products">
                <h2>Related Products</h2>
                <div className="products">
                    {
                        allproducts.map(product => {
                            //console.log(limitRelated);
                            if (product.category === detailProduct.category && product.isDelete === false && product._id !== detailProduct._id) {
                                count++;
                                if (count >= 6) return null
                                return <div className='product_card'>
                                    <img src={product.images.url[0]} alt="picture1" />
                                    <div className="product_box">
                                        <h2 title={product.title}>{product.title}</h2>
                                        {
                                            product.discount > 0 ?
                                                <div className="discount-product">
                                                    <span>${(product.prices - (product.prices * product.discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                                                    <strike>${product.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strike>
                                                </div> :
                                                <div className="normal-price">${product.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
                                        }
                                        <div className="compare-link">
                                            <Link to={`/compare/${product._id}-${detailProduct._id}`}>
                                                Compare
                                            </Link>
                                        </div>
                    
                                    </div>

                                </div >
                            }
                            return null
                        })
                    }
                </div>
            </div>
            {
                (rProducts.length > 0 && rProducts[0] !== undefined) &&
                <div className="box-orther" style={{ marginTop: "2rem" }}>
                    <p style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "25px" }}>recommend products</p>
                    <div className="other-products">
                        {
                            rProducts.map(product => {
                                return <ProductItem key={product._id} product={product} />
                            })
                        }
                    </div>

                </div>
            }
            <div className="comments-products">
                <h2>Comments</h2>
                <div className="user-rating">
                    <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                    <label htmlFor="rd-5" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                    <label htmlFor="rd-4" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                    <label htmlFor="rd-3" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                    <label htmlFor="rd-2" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                    <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>
                {
                    user._id && <div className="comments">
                        <Comments id={user._id} socket={socket} name={user.name} idProduct={idProduct.id} rating={rating} token={token} />
                    </div>
                }
                <div className="show-comment">
                    {
                        comments.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} id={user._id} socket={socket} name={user.name} idProduct={idProduct.id} />
                        ))
                    }
                </div>
            </div>
            {
                (comments.length >= 5) && <div className="load-and-hide-cmt">
                    {
                        (comments.length > page * 5 - 1) ?
                            <div>{loading === false ? <Loading /> : <button onClick={loadMore}>load more... </button>}</div> :
                            <div>{loading === false ? <Loading /> : <button onClick={hideCmt}>hide comments... </button>}</div>
                    }
                </div>
            }
        </div>
    );
}

export default React.memo(DetailProduct);