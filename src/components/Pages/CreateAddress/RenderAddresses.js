import React, { useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../GlobalState'

function RenderAddresses({ address, index }) {
    const state = useContext(GlobalState);
    const [token] = state.token
    const [addresses, setAddresses] = state.UserAPI.addresses
    const [callback, setCallback] = state.UserAPI.callback
    const removeItem = () => {
        if (window.confirm('Do you want delete this item')) {
            addresses.splice(index, 1)
            setAddresses([...addresses]);
            refreshAddress(addresses)
        }
    }
    const refreshAddress = async (addresses) => {
        try {
            await axios.post('/user/remove', { addresses },
                {
                    headers: { Authorization: token }
                })
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className='render-address'>
            <h3>Name: {address.name}</h3>
            <p>Địa Chỉ: {address.inforAddress},{address.ward}, {address.district}, {address.city}</p>
            <p>Phone: {address.phone}</p>
            <p onClick={removeItem}>X</p>
        </div>
    );
}

export default RenderAddresses;