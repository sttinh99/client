import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const initialState = {
    title: '',
    prices: 0,
    description: '',
    content: '',
    quantity: 0,
    category: ''
}

function CreateProduct(props) {
    const state = useContext(GlobalState)
    const { categories } = props
    const [token] = state.token;
    const [isAdmin] = state.UserAPI.isAdmin
    const [product, setProduct] = useState(initialState);
    const [images, setImages] = useState(false)
    const [callback, setCallback] = state.ProductAPI.callback

    const history = useHistory();
    const param = useParams();

    /* update Product */
    const [products] = state.ProductAPI.products
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    console.log(product);
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }
        else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0]
            // console.log(file);
            if (!file) return alert('file not exists')
            let formData = new FormData()
            formData.append('file', file);
            try {
                const res = await axios.post('/images/upload', formData, {
                    headers: { 'content-type': 'multipart/form-data', Authorization: token }
                })
                console.log(res);
                setImages(res.data)
            } catch (error) {
                return alert(error.response.data.msg);
            }
        } catch (error) {
            return alert(error.response.data.msg)
        }
    }
    const handleDelete = async () => {
        try {
            if (!token) return alert('not upload')
            await axios.post('/images/delete', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setImages(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        console.log(name, value);
        setProduct({ ...product, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(images, 'img');
            if (!isAdmin) return alert('you are not admin')
            if (!images) return alert('no images upload')
            if (onEdit) {
                await axios.post(`/products/update/${param.id}`, { ...product, images }, {
                    headers: { Authorization: token }
                })
            }
            else {
                await axios.post('/products/create', { ...product, images }, {
                    headers: { Authorization: token }
                })
            }
            // setImages(false)
            // setProduct(initialState)
            setCallback(!callback)
            history.push("/products");
        } catch (error) {
            console.log(error.response);
            return alert(error.response)
        }
    }
    /*end create*/
    const styleUpload = {
        display: images ? 'block' : 'none'
    }

    return (
        <div className='create-product'>
            <div className='add-images'>
                <input type='file' className='images' id='file' name='file' onChange={handleUpload} />
                <div id='file-img' style={styleUpload}>
                    <img src={images ? images.url : ''} alt='' />
                    <span onClick={handleDelete}>X</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='title'>
                    <label htmlFor='title'>Title: </label>
                    <input type='text' id='title' name='title' placeholder='add title' value={product.title} onChange={handleChangeInput} />
                </div>
                <div className='prices'>
                    <label htmlFor='prices'>Prices: </label>
                    <input type='text' id='prices' name='prices' placeholder='add prices' value={product.prices} onChange={handleChangeInput} />
                </div>
                <div className='description'>
                    <label htmlFor='description'>description: </label>
                    <textarea type='text' id='description' name='description' placeholder='add description' value={product.description} rows='3' onChange={handleChangeInput} />
                </div>
                <div className='content'>
                    <label htmlFor='content'>content: </label>
                    <textarea type='text' id='content' name='content' placeholder='add content' value={product.content} rows='7' onChange={handleChangeInput} />
                </div>
                <div className='quantity'>
                    <label htmlFor='quantity'>quantity: </label>
                    <input type='text' id='quantity' name='quantity' placeholder='add quantity' value={product.quantity} onChange={handleChangeInput} />
                </div>
                <div className='category'>
                    <label htmlFor='category'>category</label>
                    <select name='category' onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => {
                                return <option key={category._id}> {category.name}</option>
                            })
                        }
                    </select>
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    );
}

export default CreateProduct