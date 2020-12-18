import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { GlobalState } from '../../GlobalState'

import axios from 'axios'

function TransitionHisory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.UserAPI.history
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.UserAPI.callback

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                // console.log(isAdmin);
                if (isAdmin) {
                    const res = await axios.get('/checkout', {
                        headers: { Authorization: token }
                    })
                    // console.log(res.data.checkouts);
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
    }, [token, isAdmin, callback, setHistory])

    const handleOnChange = async (item) => {
        try {
            await axios.post(`/checkout/${item._id}`, { status: !item.status },
                {
                    headers: { Authorization: token }
                }
            )
            setCallback(!callback)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('kkkk');
    }, [history])
    // const checkOrder = async (item) => {
    //     console.log(x.status, 'x');
    // }
    return (
        <div className='bill'>
            <div className='trans-history'>
                <h2>Transition History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>TransID</th>
                            <th>Date Purchase</th>
                            <th>View Detail</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((item) => {
                                return <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${item._id}`}>ViewDetail</Link></td>
                                    {isAdmin &&
                                        // <td>
                                        //     <input type="checkbox" checked={item.status} onChange={() => handleOnChange(item)} />
                                        // </td>
                                        <button >export Bill</button>
                                    }
                                    {
                                        !isAdmin && isLogged &&
                                        <td>
                                            <input type="checkbox" checked={item.status} onChange={() => { }} />
                                        </td>
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransitionHisory;