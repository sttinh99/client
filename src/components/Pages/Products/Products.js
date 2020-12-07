import React, { useContext } from 'react';

import { GlobalState } from '../../GlobalState'
import ProductItem from '../Item/ProductItem'

function Products() {
    const state = useContext(GlobalState)
    const [products] = state.ProductAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    //console.log(products);
    return (
        <div className='products'>
            {
                products.map(product => {
                    //console.log(product);
                    return <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
                })
            }
        </div>
    );
}

export default Products;