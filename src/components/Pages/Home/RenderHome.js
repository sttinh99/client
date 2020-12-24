import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'


function RenderHome({ items }) {
    const state = useContext(GlobalState)
    const addCart = state.UserAPI.addCart;
    if (items.length === 0) return null
    return (
        <section className="products-home">
            <div className="container">
                <h2 className="h2 upp align-center">{items[0].category}</h2>
                <hr className="offset-lg" />
                <div className="row">
                    {
                        items.map(item =>
                            <div className="col-sm-6 col-md-4 product" key={item._id}>
                                <div className="body">
                                    <Link to="#favorites" className="favorites"><i className="ion-ios-heart-outline" /></Link>
                                    <Link to="#favorites"><img src={item.images.url} alt="Apple iMac 27 Retina" /></Link>
                                    <div className="content align-center">
                                        <p className="price">${item.prices}</p>
                                        <h2 className="h3">{item.title}</h2>
                                        <hr className="offset-sm" />
                                        <Link to={`/products/detail/${item._id}`}><button className="btn btn-link"> <i className="ion-android-open" /> Details</button></Link>
                                        <Link to='#'>
                                            <button className="btn btn-primary btn-sm rounded" onClick={() => addCart(item)}> <i className="ion-bag" /> Add to cart</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="align-right align-center-xs">
                    <hr className="offset-sm" />
                    <Link to='/products'><h5 className="upp">View all tablets </h5></Link>
                </div>
            </div>
        </section>
    );
}

export default RenderHome;