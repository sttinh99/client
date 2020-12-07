import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name: "", email: "", password: ""
    })
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const registerSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = '/'
        } catch (error) {
            //console.log(error.response);
            alert(error.response.data.msg)
        }
    }
    return (
        <div className='login-page'>
            <form onSubmit={registerSubmit}>
                <input type='text' name='name' required placeholder='input name here' value={user.name} onChange={onChangeInput} />
                <input type='email' name='email' required placeholder='input email here' value={user.email} onChange={onChangeInput} />
                <input type='password' name='password' required placeholder='input password here' value={user.password} onChange={onChangeInput} />
                <div className='row-auth'>
                    <button type='submit'>Register</button>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;