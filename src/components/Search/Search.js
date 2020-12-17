import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState';
import loupe from '../../images/loupe.svg';
function Search() {
    const state = useContext(GlobalState)
    const [search, setSearch] = state.ProductAPI.search
    return (
        <div className="search">
            <input type="text" value={search} placeholder="Search"
                onChange={e => setSearch(e.target.value.toLowerCase())} />
            <div className="search-loupe">
                <img src={loupe} alt=""/> 
            </div>
        </div>
    );
}

export default Search;