import React from 'react';
import '../Contact/Contact.css'
function Contact() {
    return (
        <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
            <div className="wrapper wrapper--w680">
                <div className="card card-1">
                    <div className="card-heading" />
                    <div className="card-body">
                        <h2 className="title">Contact Us</h2>
                        <p className="text-contact">Any questions so please contact:</p>
                        <strong className="text-contact">shop-ute@gmail.com</strong>
                        <div className="map">
                            <span style={{ "fontSize": "30px" }}>Our Address:</span>
                            <iframe title="map" allowfullscreen="" aria-hidden="false" tabindex="0" frameborder="0" className='map-iframe' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.476514028973!2d106.7533891145204!3d10.851315392270688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527bd80c66b4f%3A0x1243c8a70dc5d2e0!2zMSBWw7UgVsSDbiBOZ8OibiwgTGluaCBDaGnhu4N1LCBUaOG7pyDEkOG7qWMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1610888496501!5m2!1svi!2s"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;