import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState'

function Filter() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.ProductAPI.products
    const [category, setCategory] = state.ProductAPI.category

    const [categories, setCategories] = state.CategoryAPI.categories

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div className="filter-menu">
            <div className="row">
                <span>Filter: </span>
                <select name='category' value={category} onChange={handleChangeCategory}>
                    <option value=''>All Categories</option>
                    {
                        categories.map((item) => {
                            return (
                                <option value={'category=' + item.name} key={item._id}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    );
}

export default Filter;