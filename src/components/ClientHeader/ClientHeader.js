import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import three_line from '../../images/three_line.png'
function ClientHeader({ logoutUser, uimg, check, v, cart, user }) {
    const [options,setOption]=useState(false)
    return (
        <>
            <div className="client">
                <Link to="/home">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="cart-icon">
                <Link to='/cart' onClick={check}>
                    <img src={v} alt=""></img>
                    <span>{cart.length}</span>
                </Link>
            </div>
            <div className='user'>
                <img src={uimg} alt="" className="user-img" />
                <div className="user-content">{user.name}
                    {
                        options && <ul className='form-action'>
                        <li><Link to="/address">List Addresses</Link></li>
                        <li><Link to="/history">Transaction History</Link></li>
                        <li><Link to={`/changepassword`}>Change Password</Link></li>
                        <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li>
                    </ul>
                    }
                </div>
                <img src={three_line} alt="options" className="options"  onClick={()=>setOption(!options)}/>

            </div>
        </>
    );
}

export default React.memo(ClientHeader);