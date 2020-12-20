import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

// import PaypalButton from './PaypalButton'

import axios from 'axios'

function Cart() {
    const state = useContext(GlobalState)
    //console.log(state);
    const [cart, setCart] = state.UserAPI.cart;
    const [products] = state.ProductAPI.products;
    const [token] = state.token
    //const [isLogged] = useState(false)
    const [total, setTotal] = useState(0);
    useEffect(() => {
        console.log(cart, 'cart');
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.count * item.prices
            }, 0)
            setTotal(total)
        }
        getTotal();
    }, [cart])
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
    if (cart.length === 0)
        return <>
            <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty</h2>
            <Link to='/products' className="shopping">Go to Shopping</Link>
        </>
    return (
        <div className="cart-box">
            {
                cart.map(item => (
                    <div className="cart-item" key={item._id}>
                        <img src={item.images} alt="" />
                        <p className='cart-title'>{item.title}</p>
                        <p className='cart-price'>{item.prices}</p>
                        <p className='cart-quantity'>
                            <button onClick={() => reduceItem(item._id)}>-</button>
                            <span>{item.count}</span>
                            <button onClick={() => augmentItem(item._id)}>+</button>
                        </p>
                        <p className='cart-totalItem'>{item.count * item.prices}</p>
                        <button className="drop-item" onClick={() => removeItem(item._id)}>X</button>
                    </div>
                ))
            }
            <div className='total'>
                <h3>Total: {total}đ</h3>
                <Link to='/checkout'>Checkout</Link>
            </div>
        </div>
    );
}
export default Cart;
