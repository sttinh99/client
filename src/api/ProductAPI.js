import { useState, useEffect } from 'react';
import axios from 'axios'

function ProductAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)


    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/products?${category}&${sort}&title[regex]=${search}`);
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts();
    }, [callback, category, search, sort])

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        result: [result, setResult]
    }
}

export default ProductAPI;