import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CategoryAPI(token) {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false);
    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('/category')
            setCategories(res.data.categories)
        }
        console.log(categories, 'xxx');
        getCategories();
    }, [callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoryAPI;