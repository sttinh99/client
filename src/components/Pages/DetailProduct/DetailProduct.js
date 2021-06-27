import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { GlobalState } from '../../GlobalState'

import ProductItem from '../Item/ProductItem'
import RenderContent from './RenderContent'
import Comments from '../Comments/Comments'
import CommentItem from '../CommentItem/CommentItem'
import Loading from '../../Loadding/Loadding'

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
    const socket = state.socket

    const [detailProduct, setDetailProduct] = useState([])
    const [comments, setCommnets] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (idProduct) {
            allproducts.forEach(product => {
                //console.log(product);
                if (product._id === idProduct.id) setDetailProduct(product);
            })
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
                })
                setCommnets(newArr)
            })
            return () => socket.off("replyComment");
        }

    }, [socket, comments])

    //loadmore...
    const showContent = (objects) => {
        // console.log(objects);
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
    if (detailProduct.length === 0) return null
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
                    <div className="row-price">
                        {detailProduct.discount > 0 ?
                            <p>Price: ${(detailProduct.prices - (detailProduct.prices * detailProduct.discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                &emsp;<strike style={{ fontWeight: "100", color: "#777", opacity: "0.5" }}> Old price: ${detailProduct.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strike></p> :
                            <p>Price: ${detailProduct.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>}
                        {/* <h3 className="warranty">warranty: {detailProduct.warranty}</h3> */}
                    </div>
                    {
                        detailProduct.content ?
                            <div className="content">
                                <span className="infor">Infor Products-----------</span>
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
                                <h3>
                                    - Thiết kế mềm mại, đơn giản<br />- Kết nối không dây bluetooth linh hoạt<br />- Độ chính xác cao, lướt được trên nhiều bề mặt<br />- Tính năng Swift Pair độc đáo có thể Pair thiết bị ngay trên thông báo<br />- khuôn ôm sát tay thoải mái sử dụng thời gian dài
                                </h3>
                            </div>
                    }
                    {detailProduct.isDelete === true ? <p className="sold-out">Sold out</p> :
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
            <div className="comments-products">
                <h2>Comments</h2>
                {
                    user._id && <div className="comments">
                        <Comments id={user._id} socket={socket} name={user.name} idProduct={idProduct.id} />
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