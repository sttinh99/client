import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

function ViewDetailOrder() {
    const state = useContext(GlobalState);
    const [history] = state.UserAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            });
        }
    }, [params.id])
    if (orderDetails.length === 0) return <h2>Empty</h2>
    return (
        <div className="detail-order">
            <h2 style={{ "textAlign": "center" }}>Address Customer</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.name}</td>
                        <td>{orderDetails.address}</td>
                        <td>{orderDetails.phone}</td>
                    </tr>
                </tbody>
            </table>
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
                            <td className='prices'>{item.prices}</td>
                            <td className='count'>{item.count}</td>
                            <td className='total'>{item.count * item.prices}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <h3>Total:{orderDetails.total}</h3>
        </div>
    );
}

export default ViewDetailOrder;