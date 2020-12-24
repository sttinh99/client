import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState'

import "./Home.css"

import RenderHome from './RenderHome'
import RenderBlog from './RenderBlog'
import Carousel from '../../Pages/Carousel/Carousel'

function Home() {
    const state = useContext(GlobalState)
    const [products] = state.ProductAPI.products
    const itemsLaptop = products.filter(product => {
        return product.category === 'laptop'
    })
    const itemsHeadphone = products.filter(product => {
        return product.category === 'headphone'
    })
    const itemsSSD = products.filter(product => {
        return product.category === 'ssd'
    })
    console.log(itemsSSD, 'asadsd');
    return (
        <div className="user-home">
            <Carousel />
            <hr className="offset-lg" />
            <hr className="offset-md" />
            <RenderHome items={itemsLaptop.splice(0, 3)} />
            <RenderHome items={itemsHeadphone.splice(0, 3)} />
            <RenderHome items={itemsSSD.splice(0, 3)} />
            <RenderBlog />
        </div>
    );
}

export default Home;