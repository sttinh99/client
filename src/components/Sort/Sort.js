import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState'

function Sort() {
    const state = useContext(GlobalState)
    const [sort, setSort] = state.ProductAPI.sort
    return (
        <div className="sort-menu">
            <div className="row">
                <span>SortBy: </span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-prices">Price: Hight-Low</option>
                    <option value="sort=prices">Price: Low-Hight</option>
                    {/* <option value=""></option> */}
                </select>
            </div>
        </div>
    );
}

export default Sort;