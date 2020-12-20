import React, { useState, useEffect } from 'react';
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        // console.log(token, 'tk');
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    });
                    //console.log(res.data.user.role);
                    setIsLogged(true);
                    setAddresses(res.data.user.address)
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.user.cart);
                } catch (error) {
                    alert(error)
                }
            }
            getUser();
        }
    }, [token, callback])
    const addCart = async (product) => {
        if (!isLogged) {
            window.location.href = '/login';
            return alert('please login to continue');
        };
        if (product.quantity === 0) {
            window.location.href = '/products';
            return alert('san pham da duoc ban het')
        }
        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            // console.log('test');
            setCart([...cart, {
                _id: product._id,
                title: product.title,
                count: 1,
                prices: product.prices,
                images: product.images.url
            }])
            await axios.post('/user/addcart', {
                cart: [...cart,
                {
                    _id: product._id,
                    title: product.title,
                    count: 1,
                    prices: product.prices,
                    images: product.images.url
                }]
            }, { headers: { Authorization: token } })
        }
        else {
            return alert('This product has been added to cart');
        }
    }
    useEffect(() => {
        const getCity = async () => {
            const res = await axios.get('https://thongtindoanhnghiep.co/api/city');
            setCities(res.data.LtsItem)
        }
        getCity();
    }, [])
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addresses: [addresses, setAddresses],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback],
        cities: [cities, setCities]
    }
}

export default UserAPI;