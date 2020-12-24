import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { GlobalState } from '../../GlobalState'
import ProductItem from '../Item/ProductItem'
import AdminProducts from '../../Admin/AdminProducts/AdminProducts'
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
        <div className={isAdmin ? 'no-care' : ""}>
            <div className="filter-n-sort">
                <div className='create'>
                    {
                        isAdmin && <Link to="/products/create">Create Products</Link>
                    }
                </div>
                <div className="filter-sort">
                    <Filter />
                    <Sort />
                </div>

            </div>

            {
                !isAdmin ?
                    <div className='products'>
                        {
                            products.map(product => {
                                //console.log(product);
                                if (product.isDelete === true) {
                                    return null;
                                }
                                return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                                    token={token} callback={callback} setCallback={setCallback} />
                            })
                        }
                    </div> :
                    <div className='products-admin'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Prices</th>
                                    <th>Category</th>
                                    <th>Solded</th>
                                    <th>Update/Drop</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => {
                                        //console.log(product);
                                        if (product.isDelete === true) {
                                            return null;
                                        }
                                        return <AdminProducts key={product._id} product={product} isAdmin={isAdmin}
                                            token={token} callback={callback} setCallback={setCallback} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
}

export default Products;