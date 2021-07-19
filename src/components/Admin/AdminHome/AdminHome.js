// export default AdminHome;
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import './AdminHome.css'
import { Link } from 'react-router-dom';

function AdminHome() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [checked, setChecked] = useState([]);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    let labels = [];
    let datas = [];
    let obj = {};
    let totalP = 0;
    let totalS = 0;
    useEffect(() => {
        const getAllHis = async () => {
            const res = await axios.get('/checkout', {
                headers: { Authorization: token }
            })
            const res1 = await axios.get(`/category`, {
                headers: { Authorization: token }
            });
            const res2 = await axios.get('/products/all')
            setChecked(res.data.checkouts);
            setCategories(res1.data.categories)
            setProducts(res2.data.products)
        }
        getAllHis();
    }, [token])
    // const confirmed = checked.filter(item => item.status === true)
    // if (confirmed) {
    //     confirmed.map((item) => {
    //         labels.push(new Date(item.createdAt).toLocaleDateString())
    //         datas.push(item.total)
    //     })
    // }
    if (categories) {
        categories.forEach((category) => {
            let key = category.name;
            let x = 0;
            if (products) {
                products.forEach((product) => {
                    if (product.category === category.name) {
                        x += product.sold;
                    }
                })
            }
            obj[key] = x;
        })
    }
    if (obj) {
        labels = Object.keys(obj);
        datas = Object.values(obj);
    }
    if (checked) {
        checked.forEach((item) => {
            totalP += (item.total + item.deliveryCharges);
            item.cart.forEach((product) => {
                totalS += (product.count)
            })
        })
        totalP = totalP.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const data = {
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: 'Solded Products',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                fill: false,
                data: datas,
            },
            {
                type: 'bar',
                label: 'Solded Products',
                backgroundColor: 'rgb(207 16 255)',
                data: datas,
                borderColor: 'white',
                borderWidth: 2,
            },
        ],
    };
    return (
        <div className="admin-home">
            <div className='header'>
                <div className="statistical">
                    <div className="title">
                        <p style={{ textAlign: 'start', fontSize: '30px' }}>Sales Statistics</p>
                    </div>
                    <hr />
                    <div className="xx" style={{ fontSize: '20px' }}>
                        <div className="sold" >
                            <span>Total products sold</span>
                            <p>{totalS}</p>
                        </div>
                        <div className="total-prices">
                            <span>Total amount received</span>
                            <p>${totalP}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="xx">
                        <Link to="/history">View List Order</Link>
                    </div>
                </div>
            </div>
            <div className="chart">
                <div className="block-chart">
                    <Bar data={data} />
                </div>
                <div className="des-detail">
                    {
                        datas.length > 0 && <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Quantity Sold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    labels.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item}</td>
                                                <td>{datas[index]}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    )
};

export default AdminHome;