import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'



function RenderHome({ items }) {
    const state = useContext(GlobalState)
    const addCart = state.UserAPI.addCart;
    const [categories] = state.CategoryAPI.categories

    const history = useHistory();

    const clickDetail = (id) => {
        history.push(`/products/detail/${id}`);
    }

    if (items.length === 0) return null
    return (
        <section className="products-home">
            <div className="box-products">
                <h2 className="text">{items[0].category + `s`}</h2>
                <div className="render-items">
                    {
                        items.map(item =>
                            <div className="product-item" key={item._id}>
                                <img src={item.images.url} alt="Apple iMac 27 Retina" onClick={() => clickDetail(item._id)} />
                                <div className="content">
                                    {
                                        item.discount > 0 ?
                                            <div className="discount-product">
                                                <span>${(item.prices - (item.prices * item.discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                                                <strike>${item.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strike>
                                            </div> :
                                            <span>${item.prices}</span>
                                    }
                                    <h2 className="h3">{item.title}</h2>
                                    <p className="des">{item.description}</p>
                                    <div className="add-cart">
                                        <Link to={`/products/detail/${item._id}`} className="view-detail"> Details</Link>
                                        <button onClick={() => addCart(item)} className="addcart"> Add to cart</button>
                                    </div>
                                </div>
                                <p className='solded'>solded: {item.sold}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {categories.length > 0 && <Link to={`/products/category/${categories.find(item => item.name === items[0].category)._id}`}><h5 className="upp">View all {items[0].category}s</h5></Link>}
        </section >
    );
}

export default React.memo(RenderHome);