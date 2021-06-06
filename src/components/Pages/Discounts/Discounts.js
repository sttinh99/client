import axios from 'axios';
import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState'
import './Discounts.css'
import RenderDiscount from './RenderDiscount';


const schedule = ["a week", "two weeks", "three weeks", "a month"]

function Discount() {
    const state = useContext(GlobalState);
    // const [search, setSearch] = state.CategoryAPI.search
    const [discounts] = state.DiscountAPI.discounts
    const [categories] = state.CategoryAPI.categories
    const [category, setCategory] = useState("")
    const [discount, setDiscount] = useState(0)
    const [date, setDate] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.DiscountAPI.callback
    const socket = state.socket;
    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleChangeDiscount = (e) => {
        setDiscount(e.target.value)
    }
    const handleChangeDate = e => {
        setDate(e.target.value);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/discounts/create`, { discount, category, date }, {
                headers: { Authorization: token }
            })
            alert(res.data.msg)
            setCallback(!callback)
            socket.emit("deleteDiscount", callback)
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    return (
        <div className="block-discount">
            <h2>Discount</h2>
            <div className="div-discount">
                <form className="form-discount" onSubmit={handleOnSubmit}>
                    <div className="box-discount">
                        <label name="type-discount" htmlFor="discount">Discount: </label>
                        <input id="discount" type='number' name='discount' required placeholder='Input Discount...'
                            value={discount} onChange={handleChangeDiscount} />
                    </div>
                    <div className="box-category">
                        <label name="categoty" htmlFor="categoty">Category:</label>
                        <select name='category' value={category} onChange={handleChangeCategory}>
                            <option value=''>All Categories</option>
                            {
                                categories.map((item) => {
                                    return (
                                        <option value={item.name} key={item._id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="deadline-date">
                        <label name="date-discount" htmlFor="date-discount">Type Discount:</label>
                        <select name='date-discount' value={date} onChange={handleChangeDate}>
                            <option value=''>Type Discount</option>
                            {
                                schedule.map((item, index) => {
                                    return (
                                        <option value={item} key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='row-auth'>
                        <button type='submit'>Create</button>
                    </div>
                </form>
                <RenderDiscount discounts={discounts} token={token} callback={callback} setCallback={setCallback} socket={socket} />
            </div>
        </div>
    );
}

export default React.memo(Discount);