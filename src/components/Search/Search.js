import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'

import { GlobalState } from '../GlobalState'
import dele from '../../images/delete.png'
function Search({ search, handleOnChange,sethidden}) {
    const state = useContext(GlobalState)
    const [search1, setSearch1] = state.ProductAPI.search
    let history = useHistory();
    const handleOnClick = async () => {
        search = search1;
        history.push('/products')
    }
    return (
        <div className="search">
            <input type="text" value={search} placeholder="Search"
                onChange={(handleOnChange) || (e => setSearch1(e.target.value.toLowerCase()))} />
            <div className="search-loupe" onClick={sethidden}>
                <img src={dele} alt="" />
            </div>
        </div>
    );
}

export default React.memo(Search);