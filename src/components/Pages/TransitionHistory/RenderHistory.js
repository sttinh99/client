import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import axios from 'axios'

function RenderHistory({ item, index }) {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.UserAPI.history
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    console.log(history, 'render');
    useEffect(() => {
        if (token) {
            console.log(token);
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/checkout', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data.checkouts)
                }
                else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                }
            }
            getHistory();
        }
    }, [isAdmin])

    const checkOrder = async (item) => {
        try {
            await axios.post(`/checkout/${item[index]._id}`, { status: item[index].status },
                {
                    headers: { Authorization: token }
                }
            )
        } catch (error) {
            alert(error.message)
        }
    }
    const handleOnChange = async (x) => {
        console.log(x.status, 'x');
        await setHistory([...history], history[index] = { ...history[index], status: !x.status });
        await checkOrder(history);
    }
    return (
        <tr key={item._id}>
            <td>{item._id}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            <td><Link to={`/history/${item._id}`}>ViewDetail</Link></td>
            {isAdmin &&
                <td>
                    <input type="checkbox" checked={item.status} onChange={() => handleOnChange(item)} />
                </td>
            }
            {
                !isAdmin && isLogged &&
                <td>
                    <input type="checkbox" checked={item.status} onChange={() => { }} />
                </td>
            }
        </tr>
    );
}

export default RenderHistory