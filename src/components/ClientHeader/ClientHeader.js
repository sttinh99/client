import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Search from '../Search/Search'

function ClientHeader({ logoutUser, user, check, v, cart }) {
    const loggedRouter = () => {
        return <>
            <li className="user">{user.name}
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
            <ul>
                <li><Link to="/home">Home</Link> </li>
                <li> <Link to="/products">Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {loggedRouter()}
            </ul>
            <div className="cart-icon">
                <Link to='/cart' onClick={check}>
                    <img src={v} alt="" width="50" ></img>
                    <span>{cart.length}</span>
                </Link>
            </div>
            <Search />
        </header>
    );
}

export default ClientHeader;