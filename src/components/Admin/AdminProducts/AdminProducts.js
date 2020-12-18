import React from 'react';
import axios from 'axios'
import BtnRender from '../../Pages/Item/BtnRender'

function AdminProducts({ product, token, callback, setCallback }) {
    const deleteProduct = async () => {
        try {
            const deleteImg = await axios.post('/images/delete', { public_id: product.images.public_id }, {
                headers: { Authorization: token }
            })
            const deleteProduct = await axios.post(`/products/delete/${product._id}`, {
                headers: { Authorization: token }
            })
            await deleteImg
            await deleteProduct
            setCallback(!callback)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <tr key={product._id}>
            <td className='images'>
                <img src={product.images.url} alt='product'></img>
            </td>
            <td className="title">{product.title}</td>
            <td className="quantity">{product.quantity}</td>
            <td className="prices">{product.prices}$</td>
            <td className="category">{product.category}</td>
            <td className="sold">{product.sold}</td>
            <td className="update-or-drop">
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </td>
        </tr>
    )
}

export default AdminProducts;