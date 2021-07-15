import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../GlobalState'
import { Link, useHistory } from 'react-router-dom'
// import socketIOClient from 'socket.io-client';

import PaypalButton from './PaypalButton'
import RenderAddresses from '../../Pages/CreateAddress/RenderAddresses'

import axios from 'axios'

import gotoshoping from '../../../images/shopping.png'

// const ENDPOINT = "http://localhost:3000";

// const socket = socketIOClient(ENDPOINT);

function Checkout() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserAPI.cart;
    const [token] = state.token
    const [addresses] = state.UserAPI.addresses
    const [address, setAddress] = useState("");
    const [callback, setCallback] = state.ProductAPI.callback;
    const socket = state.socket;

    let payments;
    const [deliveryCharges, setDeliveryCharges] = useState(0)

    // Code tính khoảng cách:
    const [distance, setDistance] = useState(809028);
    const [duration, setDuration] = useState(0);


    const addToCart = async (cart) => {
        // console.log(cart, "af");
        await axios.post('/user/addcart', { cart },
            {
                headers: { Authorization: token }
            })

    }
    const history = useHistory();

    useEffect(() => {
        if (distance) {
            console.log("Distance & Duration have updated", distance, duration);
            if (distance <= 10000) {
                setDeliveryCharges(0);
            }
            if (distance > 10000 && distance <= 300000) {
                setDeliveryCharges(1)
            }
            if (distance > 300000 && distance <= 600000) {
                setDeliveryCharges((1.5 + (distance - 300000) / 1000 * 0.002))
            }
            if (distance > 600000 && distance <= 1000000) {
                setDeliveryCharges((2.1 + (distance - 600000) / 1000 * 0.001))
            }
            if (distance > 1000000) {
                setDeliveryCharges(2.8)
            }
        }
    }, [distance, duration, address]);

    useEffect(() => {
        // Get directions
        const google = window.google;
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: "484 Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minh",
                destination: (address.inforAddress + ',' + address.ward + ', ' + address.district + ', ' + address.city) || '',
                travelMode: google.maps.TravelMode.DRIVING
            },

            (result, status) => {
                console.log(result);
                if (status === google.maps.DirectionsStatus.OK) {
                    setDistance(result.routes[0].legs[0].distance.value);
                    setDuration(result.routes[0].legs[0].duration.value);
                } else {
                    console.error("error fetching directions", result, status);
                }
            }
        );
    }, [address.inforAddress, address.ward, address.district, address.city]);
    //get address, phone
    const orderSubmit = async (payment) => {
        // console.log(payment, 'payemnt');
        if (payment.paymentID) {
            payments = "Paid"
        }
        if (!address) return alert("You are not choose address");
        //if (!deliveryCharges) return alert("You are not choose address");
        try {
            if (cart.length === 0) {
                if (window.confirm('Your are have 0 items, Go to shopping')) {
                    window.location.href = '/products'
                }
            }
            await axios.post('/checkout', { cart, address: address, payments: payments, deliveryCharges, total: total }, {
                headers: { Authorization: token }
            });
            await setCart([]);
            await addToCart([]);
            await setCallback(!callback)
            await alert('You have successfully ordered');
            socket.emit("client-sent-data", { msg: "You have a new order" });
            await history.push('/products');
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    const changeAddress = (item, index) => {
        const chooseAddress = document.getElementsByClassName('choose')
        for (let i = 0; i < chooseAddress.length; i++) {
            if (chooseAddress[i].className === 'choose open') {
                chooseAddress[i].classList.remove('open')
            }
        }
        chooseAddress[index].classList.add('open');
        setAddress(item);
    }
    if (cart.length === 0)
        return <div className="cart-empty">
            <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Order Empty</h2>
            <img src={gotoshoping} alt="..." />
            <Link to='/products' className="shopping">Go to Shopping</Link>
        </div>
    const totalAllCart = cart.reduce((prev, item) => {
        return prev + item.count * item.prices
    }, 0)
    // if (address) {
    //     if (address) {
    //         let getCity = allAddresses.find(item => item.Name === address.city)
    //         deliveryCharges = getCity.ShipCod
    //     }
    // }
    const total = totalAllCart + deliveryCharges;
    return (
        <div className="check-out">
            <h2 className='out'>Checkout</h2>
            <div className="infor">
                <div className='inf'>
                    <h2>Choose transport fee</h2>
                    {
                        addresses.length === 0 ? <Link to='/address' className='create-address'>CreateAddress</Link> : <>
                            {
                                addresses.map((address, index) => {
                                    return <div className="choose" key={index}>
                                        <RenderAddresses key={index} address={address} index={index} changeAddress={() => changeAddress(address, index)} />
                                    </div>
                                })
                            }
                        </>
                    }
                </div>
            </div>
            <div className="cart-box">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Prices</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(item => {
                                return <tr key={item._id}>
                                    <td className='images'>
                                        <img src={item.images[0]} alt="..." />
                                    </td>
                                    <td className="title">{item.title}</td>
                                    <td className="quantity">
                                        <span>{item.count}</span>
                                    </td>
                                    <td className="prices">${item.prices.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                    <td className="total-prices">${(item.count * item.prices).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                                </tr>
                            })
                        }
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td>Transport fee</td>
                            <td>${deliveryCharges.toFixed(2)} ({(distance / 1000).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}km)</td>
                        </tr>
                    </tbody>
                </table>
                <div className='total'>
                    <h3>Grand Total: ${total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                    <div className='choose-payment'>
                        <div className='home'>
                            <label>Payment at home</label>
                            <button onClick={orderSubmit}>Order </button>
                        </div>
                        <hr />
                        <div className='online'>
                            <label>Online Payment</label>
                            <PaypalButton total={total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} tranSuccess={orderSubmit} />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default React.memo(Checkout);