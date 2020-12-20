import React from 'react';

function RenderAddresses({ address, index }) {
    return (
        <div className='render-address'>
            <h3>Name: {address.name}</h3>
            <p>Địa Chỉ: {address.inforAddress},{address.ward}, {address.district}, {address.city}</p>
            <p>Phone: {address.phone}</p>
            <p>X</p>
        </div>
    );
}

export default RenderAddresses;