import React, { useContext } from 'react';

import { GlobalState } from '../../GlobalState'
import ProductItem from '../Item/ProductItem'
import Filter from '../../Filter/Filter'
import Sort from '../../Sort/Sort'

function Products() {
    const state = useContext(GlobalState)
    const [products] = state.ProductAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.ProductAPI.callback


    //console.log(products);
    return (
        <>
            <Filter />
            <Sort />
            <div className='products'>
                {
                    products.map(product => {
                        //console.log(product);
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                            token={token} callback={callback} setCallback={setCallback} />
                    })
                }
            </div>
        </>
    );
}

export default Products;