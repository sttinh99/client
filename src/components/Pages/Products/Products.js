import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import socketIOClient from 'socket.io-client';

import { GlobalState } from '../../GlobalState'
import ProductItem from '../Item/ProductItem'
import AdminProducts from '../../Admin/AdminProducts/AdminProducts'
import Filter from '../../Filter/Filter'
import Sort from '../../Sort/Sort'
// import Search from '../../Search/Search'
import Pagination from '../../Pagination/Pagination'
import { set } from 'mongoose';
// import Loadding from '../../Loadding/Loadding';
// const ENDPOINT = "http://localhost:3000";
// const socket = socketIOClient(ENDPOINT);

function Products() {
    const state = useContext(GlobalState)
    console.log(state);
    // const [search, setSearch] = state.ProductAPI.search
    const [page, setPage] = state.ProductAPI.page
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [products] = state.ProductAPI.products
    const [callback, setCallback] = state.ProductAPI.callback;
    const socket = state.socket;
    // const handleOnChange = (e) => {
    //     setSearch(e.target.value.toLowerCase());
    // }
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
                    {/* <Search search={search} handleOnChange={handleOnChange} /> */}
                </div>
            </div>
            {products.length > 0 &&
                (!isAdmin ?
                    <div className='products'>
                        {/* {products.length === 0 && <Loadding />} */}
                        {
                            products.map(product => {
                                //console.log(product);
                                // if (product.isDelete === true) {
                                //     return null;
                                // }
                                return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                                    token={token} callback={callback} setCallback={setCallback} />
                            })
                        }
                    </div> :
                    <div className='products-admin'>
                        {/* {products.length === 0 && <Loadding />} */}
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
                                        // console.log(product);
                                        // if (product.isDelete === true) {
                                        //     return null;
                                        // }
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