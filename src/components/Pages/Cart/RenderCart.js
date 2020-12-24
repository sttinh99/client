
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState'

import axios from 'axios'

function RenderCart({ item }) {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserAPI.cart;
    const [products] = state.ProductAPI.products;
    const [token] = state.token
    const addToCart = async (cart) => {
        try {
            await axios.post('/user/addcart', { cart },
                {
                    headers: { Authorization: token }
                })
        } catch (error) {
            alert(error.message)
        }
    }
    const augmentItem = (id) => {
        let product = products.find(item => {
            return item._id === id;
        })
        cart.forEach(item => {
            if (item._id === id) {
                if (item.count < product.quantity) {
                    item.count += 1;
                }
                else {
                    alert(`Chi con ${product.quantity} san pham trong kho`)
                }
            }
        })
        setCart([...cart]);
        addToCart(cart);
    }
    const reduceItem = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? removeItem(item._id) : item.count -= 1
            }
        })
        setCart([...cart]);
        addToCart(cart);
    }
    const removeItem = (id) => {
        if (window.confirm('Do you want delete this item')) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            })
            setCart([...cart]);
            addToCart(cart);
        }
    }
    return (
        <tr key={item._id}>
            <td className='images'>
                <img src={item.images} alt="..." />
            </td>
            <td className="title">{item.title}</td>
            <td className="prices">{item.prices}$</td>
            <td className="quantity">
                <button onClick={() => reduceItem(item._id)}>-</button>
                <span>{item.count}</span>
                <button onClick={() => augmentItem(item._id)}>+</button>
            </td>
            <td className="total-prices">{item.count * item.prices}$</td>
            <td className="delete">
                <button className="drop-item" onClick={() => removeItem(item._id)}>X</button>
            </td>
        </tr>
    );
}

export default RenderCart;