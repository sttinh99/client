import axios from 'axios';
import { useState, useEffect } from 'react';

function CategoryAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false);
    // const [search, setSearch] = useState('')
    // const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`/category?limit=${page * 10}`);
            setCategories(res.data.categories)
            setResult(res.data.result)
        }
        getCategories();
    }, [callback, page])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback],
        page: [page, setPage],
        // search: [search, setSearch],
        // sort: [sort, setSort],
        result: [result, setResult]
    }
}

export default CategoryAPI;