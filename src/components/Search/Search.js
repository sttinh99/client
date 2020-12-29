import React from 'react';
import { useHistory } from 'react-router-dom'
import loupe from '../../images/loupe.svg';
function Search({ search, handleOnChange }) {
    // const state = useContext(GlobalState)
    let history = useHistory();
    const handleOnClick = async () => {
        history.push('/products')
    }
    return (
        <div className="search">
            <input type="text" value={search} placeholder="Search"
                onChange={handleOnChange} />
            <div className="search-loupe" onClick={handleOnClick}>
                <img src={loupe} alt="" />
            </div>
        </div>
    );
}

export default Search;