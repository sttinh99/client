import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'

import axios from 'axios'


function Checkout() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserAPI.cart;
    const [token] = state.token
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    //console.log(cart);

    const addToCart = async (cart) => {
        console.log(cart, "af");
        await axios.post('/user/addcart', { cart },
            {
                headers: { Authorization: token }
            })

    }
    //get address, phone
    function handleOnChangeAddress(e) {
        const value = e.target.value;
        setAddress(value);
    }
    function handleOnChangePhone(e) {
        const value = e.target.value;
        setPhone(value);
    }

    const total = cart.reduce((prev, item) => {
        return prev + item.count * item.prices
    }, 0)
    const orderSubmit = async () => {
        try {
            if (cart.length === 0) {
                if (window.confirm('Ban chua mua san pham nao. Hay ghe tham cua hang?')) {
                    window.location.href = '/products'
                }
            }
            await axios.post('/checkout', { cart, address, phone }, {
                headers: { Authorization: token }
            });
            setCart([]);
            addToCart([]);
            alert('Ban da order thanh cong');
            window.location.href = '/products'
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    if (cart.length === 0)
        return <>
            <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Order Empty</h2>
            <Link to='/products' className="shopping">Go to Shopping</Link>
        </>
    return (
        <div className="check-out">
            <div className="infor">
                <h2>Thông Tin Nhận Hàng</h2>
                <input name="address" value={address} onChange={handleOnChangeAddress} placeholder="address"></input>
                <input name="phone" value={phone} onChange={handleOnChangePhone} placeholder="phone"></input>
            </div>
            <div className="cart-box">
                {
                    cart.map(item => (
                        <div className="cart-item" key={item._id}>
                            <img src={item.images} alt="" />
                            <p className='cart-title'>{item.title}</p>
                            <p className='cart-price'>{item.prices}</p>
                            <p className='cart-quantity'>
                                <span>{item.count}</span>
                            </p>
                            <p className='cart-totalItem'>{item.count * item.prices}</p>
                        </div>
                    ))
                }
                <div className='total'>
                    <h3>Total: {total}đ</h3>
                    <button onClick={orderSubmit}>Order</button>
                </div>
            </div>
        </div>
    );
}
export default Checkout;