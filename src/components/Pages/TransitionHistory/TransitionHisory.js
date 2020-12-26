import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { GlobalState } from '../../GlobalState';

import exportbill from '../../../images/export.svg';

function TransitionHisory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.UserAPI.history
    // const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [callback] = state.UserAPI.callback

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                // console.log(isAdmin);
                if (isAdmin) {
                    const res = await axios.get('/checkout', {
                        headers: { Authorization: token }
                    })
                    console.log(res.data.checkouts);
                    setHistory(res.data.checkouts)
                }
                else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    console.log(res.data);
                    setHistory(res.data)
                }
            }
            getHistory();
        }
    }, [token, isAdmin, callback, setHistory])

    // const handleOnChange = async (item) => {
    //     try {
    //         await axios.post(`/checkout/${item._id}`, { status: !item.status },
    //             {
    //                 headers: { Authorization: token }
    //             }
    //         )
    //         setCallback(!callback)
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }
    // const checkOrder = async (item) => {
    //     console.log(x.status, 'x');
    // }
    if (history.length === 0)
        return <>
            <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>History Empty</h2>
            <Link to='/products' className="shopping">Go to Shopping</Link>
        </>
    return (
        <div className='bill'>
            <div className='trans-history'>
                <h2>Transition History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>TransID</th>
                            <th>Date Purchase</th>
                            <th>Status</th>
                            <th>View Detail</th>
                            {isAdmin ? <th>Payments</th> : null}
                            {isAdmin ? <th>Export Bill</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='id-trans'>{item._id}</td>
                                        <td className='dateOrder'>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td>{item.status ? 'Confirmed' : 'Are Confirming'}</td>
                                        <td className='view-detail'>
                                            <Link to={`/history/${item._id}`}>View Detail</Link>
                                        </td>
                                        {isAdmin ? <td>{item.payments}</td> : null}
                                        {isAdmin ? <td><button className='ex-bill'><img src={exportbill} alt="exportbillx" /></button></td> : null}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default TransitionHisory;