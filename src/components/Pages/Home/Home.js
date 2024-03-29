import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'

import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import "./Home.css"

import laptop from '../../../images/laptop.svg'
import mouse_icon from '../../../images/mouse-icon.png'
import storage from '../../../images/harddisk.png'
import headset from '../../../images/headphones.jpg'
import keyboard from '../../../images/keyboard-icon.png'
import ram from '../../../images/ram.png'

// import RenderBlog from './RenderBlog'
import Carousel from '../../Pages/Carousel/Carousel'
import RenderHome from './RenderHome';
import AdminHome from '../../Admin/AdminHome/AdminHome'
import Loadding from '../../Loadding/Loadding';

function Home() {
    const state = useContext(GlobalState)
    const [hotLaptops] = state.ProductAPI.hotLaptops;
    const [isAdmin] = state.UserAPI.isAdmin
    const [hotMouses] = state.ProductAPI.hotMouses;
    const [hotHeadphones] = state.ProductAPI.hotHeadphones;
    const [categories] = state.CategoryAPI.categories
    const [discounts] = state.DiscountAPI.discounts
    const [loading, setLoading] = useState(false)

    const icon = [keyboard, storage, ram, mouse_icon, laptop, headset]
    useEffect(() => {
        console.log(discounts);
        if (discounts) {
            discounts.map(async (item) => {
                console.log(new Date(item.to) - new Date());
                if ((new Date(item.to) - new Date()) <= 0) {
                    await axios.delete(`/discounts/delete/${item._id}`)
                }
            })
        }
        setLoading(true)
    }, [discounts])
    return (
        <div className="home-page">
            {
                !loading ? <Loadding /> : <>
                    {!isAdmin ? <div className="user-home">
                        <div className="box-header">
                            <Carousel />
                            <div className="category-sp">
                                <ul>
                                    <li style={{ "background": "rgb(243 238 238)" }}>Product Portfolio</li>
                                    {
                                        categories.map((category, index) => {
                                            return <li key={index}><Link to={`/products/category/${category._id}`}><img src={icon[index]} alt="..." /> {category.name}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="hot-products">
                            <p className="overview">A few types of best-selling products</p>
                            <div className="hot-laptops"><RenderHome items={hotLaptops.slice(0, 5)} /></div>
                            <div className="hot-mouses"><RenderHome items={hotMouses.slice(0, 5)} /></div>
                            <div className="hot-headphone"><RenderHome items={hotHeadphones.slice(0, 5)} /></div>
                        </div>
                    </div> :
                        <AdminHome />
                    }
                </>
            }
        </div>
    );
}
export default React.memo(Home);