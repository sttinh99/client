import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Header.css'

import logo from '../../logo.svg'
import react from '../../images/react.svg'
import v from '../../images/shopping-cart.svg'
import uimg from "../../images/profile-user.svg";

import Search from '../Search/Search'
import ClientHeader from '../ClientHeader/ClientHeader'

import { GlobalState } from '../GlobalState'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    const [cart] = state.UserAPI.cart
    //console.log(state);
    //console.log(cart);

    const check = () => {
        if (!isLogged) {
            window.location.href = '/login'
            return alert('please login to continue');
        }
    }

    const logoutUser = async () => {
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin')
        window.location.href = '/login'
    }

    return (
        <header>
            {/* <div className="menu"></div> */}
            <div className="logo">
                <Link to='/'>
                    <img src={react} alt="" width="100px" />
                    <p>DogFootStore</p>
                </Link>
            </div>
            {!isAdmin && !isLogged &&
                < ul className="guest">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <Link to="/login" style={{ display: "flex", flexDirection: "row" }}>
                        <img src={uimg} alt="" className="user-img" />
                        <div className="login-text">Login</div>
                    </Link>
                </ul>}
            {
                isLogged && !isAdmin && <ClientHeader uimg={uimg} logoutUser={logoutUser}
                    check={check} cart={cart} v={v} />
            }
            <Search />
        </header >
    )
}
export default Header