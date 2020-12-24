import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../GlobalState'
import axios from 'axios'

import RenderUser from './RenderUser'

function AdminUser() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [users, setUsers] = useState([])

    useEffect(() => {
        // console.log(token, 'tk');
        if (token) {
            const getAllUser = async () => {
                try {
                    const res = await axios.get('/user/users', {
                        headers: { Authorization: token }
                    });
                    //console.log(res.data.users);
                    setUsers(res.data.users)
                } catch (error) {
                    alert(error)
                }
            }
            getAllUser();
        }
    }, [token])
    // console.log(users, 'xxx');
    if (users.length === 0) return null
    return (
        <div className='all-users'>
            <h2 className='title'>Quản lý người dùng</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date Create</th>
                        <th>Date Update</th>
                        <th>Block Acount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return <RenderUser user={user} />
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AdminUser;