import React from 'react';
import "./dasboard.css";
import logo from "../../images/logo.svg";
import img from "../../images/profile-user.svg";
import {Link} from 'react-router-dom';
export default function Dasboard() {
    return (
        <div>

                <div className="left-nav">
                    <div className="nav-title">
                        <h2>Dasboard</h2>
                    </div>
                    <div className="general">
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to="/dasboard/" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>HOME</Link></span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to='/products/create' style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>CREATE PRODUCT</Link></span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to='/category' style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>CATEGORY</Link></span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to='/history' style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>HISTORY ORDER</Link></span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to='/logout' style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>LOGOUT</Link></span>
                        </div>

                    </div>
                </div>
        </div>
    );
}
