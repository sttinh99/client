import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState'

function Search() {
    const state = useContext(GlobalState)
    const [search, setSearch] = state.ProductAPI.search
    return (
        <div className="search">
            <input type="text" value={search} placeholder="find products here"
                onChange={e => setSearch(e.target.value.toLowerCase())} />
        </div>
    );
}

export default Search;