import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../GlobalState'
import ProductItem from '../Item/ProductItem'
import AdminProducts from '../../Admin/AdminProducts/AdminProducts'
import Filter from '../../Filter/Filter'
import Sort from '../../Sort/Sort'
import Pagination from '../../Pagination/Pagination'
// import Loading from '../../Loadding/Loadding'

function Products() {
    const state = useContext(GlobalState)
    console.log(state);
    const [page, setPage] = state.ProductAPI.page
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [products] = state.ProductAPI.products
    const [callback, setCallback] = state.ProductAPI.callback;
    const socket = state.socket;
    const handlePageChange = (page) => {
        setPage(page)
    }
    useEffect(() => {
        if (socket) {
            socket.on("add-product", (data) => {
                setCallback(!data);
            })
        }
    }, [socket])
    useEffect(() => {
        if (socket) {
            socket.on("deleteDiscount", (data) => {
                setCallback(!data);
            })
        }
    }, [socket])
    if (products.length === 0) {
        return <div className={isAdmin ? 'no-care' : "care"}>
            <div className="filter-n-sort">
                {
                    isAdmin &&
                    <div className='create'>
                        <Link to="/products/create">Create Products</Link>
                    </div>
                }
                <div className="filter-sort">
                    <Filter />
                    <Sort />
                </div>
            </div>
            {
                !isAdmin && <div className="not-found-products">
                    <p>Not found products</p>
                </div>
            }
        </div>
    }
    return (
        <div className={isAdmin ? 'no-care' : "care"}>
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
            {products.length > 0 &&
                (!isAdmin ?
                    <div className='products'>
                        {
                            products.map(product => {
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
                                        return <AdminProducts key={product._id} product={product} isAdmin={isAdmin}
                                            token={token} callback={callback} setCallback={setCallback} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            <Pagination page={page} handlePageChange={handlePageChange} products={products} />
        </div>
    );
}

export default React.memo(Products);