import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import logo from '../../logo.svg'
import v from '../../images/shopping-cart.svg'
import './Header.css'
import Search from '../Search/Search'
import uimg from "../../images/profile-user.svg";
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
    const loggedRouter = () => {
        return <>
            {/* <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li> */}
            <img src={uimg} alt="" className="user-img" />
            <div className="user-content">Trương Quang Tịnh
                <ul className='form-action'>
                    <li><Link to="/infor">Your Profile</Link></li>
                    <li><Link to="/history">Transaction History</Link></li>
                    <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li>
                </ul>
            </div>
        </>
    }

    return (
        <header>
            {/* <div className="menu"></div> */}
            <div className="logo">
                <Link to='/'>
                    <img src={logo} alt="" width="100px" />
                    <p>DogFootStore</p>
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <Search />
            {
                isAdmin ? '' :
                    <div className="cart-icon">
                        <Link to='/cart' onClick={check}>
                            <img src={v} alt=""></img>
                        </Link>
                        <div>{cart.length}</div>
                    </div>
            }
            {
                (isLogged ? loggedRouter() :
                    <>
                        <Link to="/login" style={{ display: "flex", flexDirection: "row" }}>
                            <img src={uimg} alt="" className="user-img" />
                            <div className="login-text">Login</div></Link>
                    </>)
            }
        </header>
    )
}
export default Header