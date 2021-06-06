import axios from 'axios';
import React, { useEffect } from 'react';

function RenderDiscount({ discounts, token, callback, setCallback, socket }) {

    const removeDiscount = async (id) => {
        try {
            if (window.confirm("You are sure delete this discount")) {
                const res = await axios.delete(`/discounts/delete/${id}`, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg);
                setCallback(!callback);
                await socket.emit("deleteDiscount", callback);
            }
        } catch (error) {
            return alert(error.response.data.msg)
        }
    }
    return (
        <div className="display-discount">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Discount</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map((item, index) => {
                        return <tr key={index}>
                            <td>{item._id}</td>
                            <td>{item.category}</td>
                            <td>{item.discount}%</td>
                            <td>{new Date(item.from).toLocaleDateString()}</td>
                            <td>{new Date(item.to).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => removeDiscount(item._id)}>X</button>
                            </td>
                        </tr>
                    }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default RenderDiscount;