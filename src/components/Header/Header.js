import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import logo from '../../logo.svg'
import v from '../../images/shopping-cart.svg'
import './Header.css'

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

    const adminRouter = () => {
        return <>
            <li><Link to='/products/create'>Create Product</Link></li>
            <li><Link to='/category'>Categories</Link></li>
            <li><Link to="/history">History Order</Link></li>
            <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li>
        </>
    }
    const loggedRouter = () => {
        return <>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li> */}
            <li className="user">QuangTinh
                <ul className='form'>
                    <li><Link to="/infor">Thong Tin Ca Nhan</Link></li>
                    <li><Link to="/history">Lich Su Giao Dich</Link></li>
                    <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li>
                </ul>
            </li>
        </>
    }

    return (
        <header>
            {/* <div className="menu"></div> */}
            <div className="logo">
                <Link to='/'>
                    <img src={logo} alt="" width="100px" />
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                {isAdmin ? adminRouter()
                    : (isLogged ? loggedRouter() :
                        <>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li> <Link to="/login">Login</Link></li>
                        </>)
                }
            </ul>
            {
                isAdmin ? '' :
                    <div className="cart-icon">
                        <Link to='/cart' onClick={check}>
                            <img src={v} alt="" width="50" ></img>
                            <span>{cart.length}</span>
                        </Link>
                    </div>
            }
            <div className="search">
                <input type="text" name="" id="" placeholder="find products here" />
            </div>
        </header>
    )
}
export default Header