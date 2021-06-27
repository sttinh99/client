import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

function ViewDetailOrder() {
    const state = useContext(GlobalState);
    const [isAdmin] = state.UserAPI.isAdmin
    const [history] = state.UserAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);

    const params = useParams()

    useEffect(() => {
        if (params) {
            history.forEach(item => {
                console.log(item, 'dá');
                if (item._id === params.id) setOrderDetails(item)
            });
        }
    }, [params.id, history, params])
    if (orderDetails.length === 0) return <h2>Empty</h2>
    return (
        <div className={isAdmin ? 'no-care' : "care"}>
            <div className="detail-order">
                <h2 style={{ "textAlign": "center" }}>View Detail History</h2>
                <div className="box-infor">
                    <div className='infor-user'>
                        <p>Name: {orderDetails.address.name}</p>
                        <p>Phone: {orderDetails.address.phone}</p>
                    </div>
                    <div className='infor-products'>
                        <span>Address Recieve: </span>
                        <span>{orderDetails.address.inforAddress}, {orderDetails.address.ward}, {orderDetails.address.district}, {orderDetails.address.city}</span>
                    </div>
                    <div className="date-purchased">
                        <label>Date Purchased: </label>
                        <span>{new Date(orderDetails.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <h2 style={{ "textAlign": "center" }}>View Detail</h2>
                <table className="render">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Prices</th>
                            <th>Count</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.cart.map((item) => {
                            return <tr key={item._id}>
                                <td className='title'>{item.title}</td>
                                <td className='img'><img src={item.images} alt='images' /></td>
                                <td className='prices'>{item.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                <td className='count'>{item.count}</td>
                                <td className='total-item'>{(item.count * item.prices).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                            </tr>
                        })}
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td>deliveryCharges</td>
                            <td>${orderDetails.deliveryCharges}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Total: ${orderDetails.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
            </div>
        </div>);
}

export default React.memo(ViewDetailOrder);