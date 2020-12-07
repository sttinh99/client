import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

function BtnRender({ product }) {
    //console.log(product);
    const state = useContext(GlobalState);
    const [isAdmin] = state.UserAPI.isAdmin;
    const addCart = state.UserAPI.addCart;

    return (
        <div className="row_btn">
            {isAdmin ?
                <>
                    <Link id="btn_buy" to={`/products/update/${product._id}`} >
                        Edit
                    </Link>
                    <Link id="btn_view" to={`/products/delete/${product._id}`}>
                        Delete
                    </Link>
                </> :
                <>
                    <Link id="btn_buy" to="/products" onClick={() => addCart(product)}>
                        Add Cart
                    </Link>
                    <Link id="btn_view" to={`/products/detail/${product._id}`}>
                        View Detail
                    </Link>
                </>
            }
        </div>
    );
}

export default BtnRender;