import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './Auth/Login'
import Register from './Auth/Register'

import Home from './Home/Home'
import Products from './Products/Products'
import About from './About/About'
import Contact from './Contact/Contact'
import Cart from './Cart/Cart'
import NotFoundPage from './NotFound/NotFound'
import DetailProduct from './DetailProduct/DetailProduct'
import TransitionHistory from './TransitionHistory/TransitionHisory'
import ViewDetailOrder from './TransitionHistory/ViewDetailOrder'

import Categories from './Categories/Categories'
import CreateProduct from './Admin/CreateProduct/CreateProduct'

import { GlobalState } from '../GlobalState'
import Checkout from './Cart/Checkout';
import Dasboard from '../AdminDasboard/Dasboard';

function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.UserAPI.isLogged;
    const [isAdmin] = state.UserAPI.isAdmin;
    const token = state.token
    const [categories] = state.CategoryAPI.categories;

    // const notLogin = (isLogged) => {
    //     setTimeout(() => {
    //         if (!isLogged) {
    //             if (window.confirm('Bạn phải đăng nhập để tiếp tục'))
    //                 window.location.href = '/login'
    //             else window.location.href = '/'
    //         };
    //     }, 3000);
    // }
    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path='/home' exact>
                <Home />
            </Route>
            <Route path='/products' exact>
                <Products />
            </Route>
            <Route path='/products/detail/:id' exact>
                <DetailProduct />
            </Route>
            <Route path='/about' exact>
                <About />
            </Route>
            <Route path='/contact' exact>
                <Contact />
            </Route>
            <Route path='/login' exact>
                {/* {isLogged ?
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    : <Login />} */}
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/dasboard' exact>
                {isLogged ? <Dasboard /> : <Login />}
            </Route>
            <Route path='/history' exact>
                {isLogged ? <TransitionHistory /> : <Login />}
            </Route>
            <Route path='/category' exact>
                {isAdmin ? <Categories /> : <NotFoundPage />}
            </Route>
            <Route path='/history/:id' exact>
                <ViewDetailOrder />
            </Route>
            <Route path='/cart' exact>
                {isLogged ? <Cart /> : <Login />}
            </Route>
            <Route path='/checkout' exact>
                <Checkout />
            </Route>

            <Route path='/products/create' exact>
                {isAdmin ? <CreateProduct categories={categories} token={token} /> : <NotFoundPage />}
            </Route>
            <Route path='/products/create/:id' exact>
                {isAdmin ? <CreateProduct categories={categories} token={token} /> : <NotFoundPage />}
            </Route>
            <Route path='*'>
                <NotFoundPage />
            </Route>

        </Switch>
    );
}
export default Pages;