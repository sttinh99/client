import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './Auth/Login'
import Register from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'
import ResetPassword from './Auth/ResetPassword'

import Home from './Home/Home'
import Users from '../Admin/AdminUsers/AdminUser'
import CreateAddress from './CreateAddress/CreateAddress'
import CreateProduct from './Admin/CreateProduct/CreateProduct'

import Products from './Products/Products'
import Discounts from './Discounts/Discounts'
import About from './About/About'
import Contact from './Contact/Contact'
import Cart from './Cart/Cart'
import NotFoundPage from './NotFound/NotFound'
import DetailProduct from './DetailProduct/DetailProduct'
import Compare from './Compare/Compare'
import TransitionHistory from './TransitionHistory/TransitionHisory'
import ViewDetailOrder from './TransitionHistory/ViewDetailOrder'

import Categories from './Categories/Categories'

import { GlobalState } from '../GlobalState'
import Checkout from './Cart/Checkout';
import Dasboard from '../AdminDasboard/Dasboard';
import Bill from '../Pages/Bill/Bill'
import RenderBill from '../Pages/Bill/RenderBill'
import ProductCategory from '../Pages/ProductCategory/ProductCategory'
import ChangePassword from '../Pages/ChangePassword/ChangePassword'

function Pages() {

    const styleObject = {
        display: 'flex',
        backgroundColor: 'rgb(245 245 245)'
    }

    const state = useContext(GlobalState);
    const [isLogged] = state.UserAPI.isLogged;
    const [isAdmin] = state.UserAPI.isAdmin;
    const [user] = state.UserAPI.user
    const token = state.token
    const [categories] = state.CategoryAPI.categories;
    return (
        <Switch>
            {/* Admin */}
            <Route path='/' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Home /></div> : <Home />}
            </Route>
            <Route path='/home' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Home /></div> : <Home />}
            </Route>
            <Route path='/dasboard' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Home /></div> : <NotFoundPage />}
            </Route>
            <Route path='/admin/users' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Users /></div> : <NotFoundPage />}
            </Route>
            <Route path='/bill/:id' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Bill /></div> : <NotFoundPage />}
            </Route>
            <Route path='/products' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Products /></div> : <Products />}
            </Route>
            <Route path='/products/create' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><CreateProduct categories={categories} token={token} /></div>
                    : <NotFoundPage />}
            </Route>
            <Route path='/products/create/:id' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><CreateProduct categories={categories} token={token} /></div>
                    : <NotFoundPage />}
            </Route>
            <Route path='/history' exact>
                {
                    isAdmin ? <div className='item' style={styleObject}><Dasboard /><TransitionHistory /></div> : (isLogged ? <TransitionHistory /> : <Login />)
                }
            </Route>
            <Route path='/category' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Categories /></div> : <NotFoundPage />}
            </Route>
            <Route path='/discounts' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Discounts /></div> : <NotFoundPage />}
            </Route>
            <Route path='/history/:id' exact>
                {
                    isAdmin ? <div className='item' style={styleObject}><Dasboard /><ViewDetailOrder /></div> : (isLogged ? <ViewDetailOrder /> : <Login />)
                }
            </Route>
            <Route path='/products/detail/:id' exact>
                {!isAdmin ? <DetailProduct /> : <NotFoundPage />}
            </Route>
            <Route path='/compare/:id' exact>
                {!isAdmin ? <Compare /> : <NotFoundPage />}
            </Route>
            <Route path='/products/category/:id' exact>
                {!isAdmin ? <ProductCategory /> : <NotFoundPage />}
            </Route>
            <Route path='/about' exact>
                {!isAdmin ? <About /> : <NotFoundPage />}
            </Route>
            <Route path='/contact' exact>
                {!isAdmin ? <Contact /> : <NotFoundPage />}
            </Route>
            <Route path='/register'>
                {!isAdmin ? <Register /> : <NotFoundPage />}
            </Route>
            <Route path='/cart' exact>
                {!isAdmin ? (isLogged ? <Cart /> : <Login />) : <NotFoundPage />}
            </Route>
            {/* Admin isLogged */}
            <Route path='/address' exact>
                {isAdmin || !isLogged ? <NotFoundPage /> : <CreateAddress />}
            </Route>
            <Route path='/changepassword' exact>
                {isAdmin || !isLogged ? <NotFoundPage /> : <ChangePassword user={user} />}
            </Route>
            {/* isLogged */}
            <Route path='/forgot_password'>
                {!isLogged ? <ForgotPassword /> : <NotFoundPage />}
            </Route>
            <Route path='/user/reset/:id'>
                {!isLogged ? <ResetPassword /> : <NotFoundPage />}
            </Route>
            {/* Khacs */}
            <Route path='/checkout' exact>
                <Checkout />
            </Route>
            <Route path='/login' exact>
                <Login />
            </Route>
            <Route path='*'>
                <NotFoundPage />
            </Route>
        </Switch>
    );
}
export default Pages;