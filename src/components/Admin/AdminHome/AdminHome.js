// export default AdminHome;
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState'
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

import './AdminHome.css'

function AdminHome() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [checked, setChecked] = useState([]);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    let labels = [];
    let datas = [];
    let obj = {};
    useEffect(() => {
        const getAllHis = async () => {
            const res = await axios.get('/checkout', {
                headers: { Authorization: token }
            })
            const res1 = await axios.get(`/category`, {
                headers: { Authorization: token }
            });
            const res2 = await axios.get('/products')
            setChecked(res.data.checkouts);
            setCategories(res1.data.categories)
            setProducts(res2.data.products)
        }
        getAllHis();
    }, [])
    // const confirmed = checked.filter(item => item.status === true)
    // if (confirmed) {
    //     confirmed.map((item) => {
    //         labels.push(new Date(item.createdAt).toLocaleDateString())
    //         datas.push(item.total)
    //     })
    // }
    if (categories) {
        categories.map((category) => {
            let key = category.name;
            let x = 0;
            if (products) {
                products.map((product) => {
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
    const data2 = {
        labels: labels,
        datasets: [
            {
                type: 'pie',
                label: 'Solded Products',
                borderColor: '#777',
                backgroundColor: [
                    'rgba(91, 189, 43)',
                    'rgba(249, 244,	0)',
                    'rgba(75, 192, 192)',
                    'rgba(255, 206, 86)',
                    'rgba(299, 70, 70)',
                    'rgba(153, 102, 255)',
                ],
                borderWidth: 0.3,
                fill: false,
                data: datas,
            },
        ],
    }
    return (
        <div className="admin-home">
            <div className='header'>
                <h1 className='title'>Report</h1>
            </div>
            <div className="chart">
                <div className="block-chart">
                    <Bar data={data} />
                </div>
                <div className="block-pie">
                    <Pie data={data2} />
                </div>
            </div>
        </div>
    )
};

export default AdminHome;