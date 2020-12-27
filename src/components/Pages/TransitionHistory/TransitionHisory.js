import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { GlobalState } from '../../GlobalState';

import exportbill from '../../../images/export.svg';

function TransitionHisory() {
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history
    // const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    // const [token] = state.token
    // const [callback] = state.UserAPI.callback



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
                                        {isAdmin ? <td><Link to='/bill' className='ex-bill'><img src={exportbill} alt="exportbillx" /></Link></td> : null}
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