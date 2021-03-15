import React from 'react';
import { Link } from 'react-router-dom'
import './Footer.css'

import facebook from '../../images/facebook.svg'
import instagram from '../../images/instagram.svg'
import twitter from '../../images/twitter.svg'
import github from '../../images/github.svg'

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p className="text-justify">Address <i>Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TPHCM</i> <p>© 1997 - 2020 Two Members Trading - Service Joint Stock Company</p>
                        Certificate of business registration: 0304998358 by Sở KH-ĐT TP.HCM cấp lần đầu ngày 30 tháng 05 năm 2007</p>
                    </div>
                    <div className="col-xs-6">
                        <h6>Main Address:</h6>
                        <ul className="footer-links">
                            <li>Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TPHCM</li>
                        </ul>
                        <h6>Open time:</h6>
                        <ul className="footer-links xxx">
                            <li>Monday: <span>7:00am - 17:00pm</span></li>
                            <li>Tuesday: <span>7:00am - 17:00pm</span></li>
                            <li>Wednesday: <span>7:00am - 17:00pm</span></li>
                            <li>Thursday:<span>7:00am - 17:00pm</span></li>
                            <li>Friday: <span>7:00am - 17:00pm</span></li>
                            <li>Saturday: <span>7:00am - 17:00pm</span></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Copyright © 2017 All Rights Reserved by
                            <Link to="#">Scanfcode</Link>
                        </p>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <Link to="https://www.facebook.com"><img src={facebook} alt="..." /></Link>
                            <Link to="https://www.instagram.com"><img src={instagram} alt="..." /></Link>
                            <Link to="https://twitter.com"><img src={twitter} alt="..." /></Link>
                            <Link to="https://github.com"><img src={github} alt="..." /></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;