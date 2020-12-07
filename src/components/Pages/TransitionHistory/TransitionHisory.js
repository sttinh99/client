import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../GlobalState'

import RenderHistory from './RenderHistory'

function TransitionHisory() {
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history //isLogin
    // console.log(history, 'trans');
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
                            history.map((item, index) => {
                                return <RenderHistory key={item._id} item={item} index={index} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransitionHisory;