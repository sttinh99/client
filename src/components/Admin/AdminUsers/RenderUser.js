import React from 'react';

function RenderUser({ user }) {
    // console.log(user);
    return (
        <tr>
            <td>{user.name}</td>
            <td className='user-email'>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
            <td><button className='block-account'>BlockAcount</button></td>
        </tr>
    );
}

export default RenderUser;