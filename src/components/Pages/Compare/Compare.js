import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import './Compare.css'

function Compare() {
    const state = useContext(GlobalState);
    const [products] = state.ProductAPI.allproducts;
    const { id } = useParams()
    let idProduct = id.split('-');
    let productsCompare = [];
    if (products) {
        productsCompare = products.filter(item => {
            return item._id === idProduct[0] || item._id === idProduct[1]
        })
    }
    console.log(productsCompare);
    return (
        <div className='compare-products'>
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Compare</h1>
            <div className="compare-table">
                {productsCompare.length > 0 &&
                    < table >
                        <thead>
                            <tr className="ttc">
                                <th>GENERAL INFORMATION</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="title">
                                <td>Image, Prices</td>
                                <td>
                                    <div>
                                        <img src={`${productsCompare[0].images.url[0]}`} alt="..." />
                                        <p>{productsCompare[0].title}</p>
                                        <p>${(productsCompare[0].prices - (productsCompare[0].prices * productsCompare[0].discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <img src={`${productsCompare[1].images.url[0]}`} alt="..." />
                                        <p>{productsCompare[1].title}</p>
                                        <p>${(productsCompare[1].prices - (productsCompare[1].prices * productsCompare[1].discount) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td>Warranty</td>
                                <td>{productsCompare[0].warranty}</td>
                                <td>{productsCompare[1].warranty}</td>
                            </tr>
                            <tr>
                                <td>Brand</td>
                                <td>{productsCompare[0].brand}</td>
                                <td>{productsCompare[1].brand}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr className="ttc">
                                <th>SPECIFICATIONS</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            (productsCompare[0].content && productsCompare[1].content) ? <tbody>
                                {productsCompare[0].content.battery && <tr>
                                    <td>Battety</td>
                                    <td>{productsCompare[0].content.battery}</td>
                                    <td>{productsCompare[1].content.battery}</td>
                                </tr>}
                                {productsCompare[0].content.cpu &&
                                    <tr>
                                        <td>CPU</td>
                                        <td>{productsCompare[0].content.cpu}</td>
                                        <td>{productsCompare[1].content.cpu}</td>
                                    </tr>}
                                {productsCompare[0].content.harddisk &&
                                    < tr >
                                        <td>Harddisk</td>
                                        <td>{productsCompare[0].content.harddisk}</td>
                                        <td>{productsCompare[1].content.harddisk}</td>
                                    </tr>}
                                {productsCompare[0].content.opearatingSysterm &&
                                    <tr>
                                        <td>Operating System</td>
                                        <td>{productsCompare[0].content.opearatingSysterm}</td>
                                        <td>{productsCompare[1].content.opearatingSysterm}</td>
                                    </tr>}
                                {productsCompare[0].content.ram &&
                                    <tr>
                                        <td>RAM</td>
                                        <td>{productsCompare[0].content.ram}</td>
                                        <td>{productsCompare[1].content.ram}</td>
                                    </tr>}
                                {productsCompare[0].content.screen &&
                                    <tr>
                                        <td>Screen</td>
                                        <td>{productsCompare[0].content.screen}inch</td>
                                        <td>{productsCompare[1].content.screen}inch</td>
                                    </tr>}
                                {productsCompare[0].content.vga &&
                                    <tr>
                                        <td>Card</td>
                                        <td>{productsCompare[0].content.vga}</td>
                                        <td>{productsCompare[1].content.vga}</td>
                                    </tr>}
                                {productsCompare[0].content.weight &&
                                    <tr>
                                        <td>Weight</td>
                                        <td>{productsCompare[0].content.weight} kg</td>
                                        <td>{productsCompare[1].content.weight} kg</td>
                                    </tr>}
                                {productsCompare[0].content.capacity &&
                                    < tr >
                                        <td>Capacity</td>
                                        <td>{productsCompare[0].content.capacity}</td>
                                        <td>{productsCompare[1].content.capacity}</td>
                                    </tr>}
                                {productsCompare[0].content.gate &&
                                    < tr >
                                        <td>Gate</td>
                                        <td>{productsCompare[0].content.gate}</td>
                                        <td>{productsCompare[1].content.gate}</td>
                                    </tr>}
                                {productsCompare[0].content.BUS &&
                                    < tr >
                                        <td>Type</td>
                                        <td>{productsCompare[0].content.BUS}</td>
                                        <td>{productsCompare[1].content.BUS}</td>
                                    </tr>}
                                {productsCompare[0].content.generation &&
                                    < tr >
                                        <td>Generation</td>
                                        <td>{productsCompare[0].content.generation}</td>
                                        <td>{productsCompare[1].content.generation}</td>
                                    </tr>}
                                {
                                    productsCompare[0].category === 'laptop' && <><tr>
                                        <td>Wireless Lan</td>
                                        <td>802.11ac 2×2 Wi-Fi</td>
                                        <td>802.11ac 2×2 Wi-Fi</td>
                                    </tr>
                                        <tr>
                                            <td>Lan</td>
                                            <td>Gigabit Ethernet</td>
                                            <td>Gigabit Ethernet</td>
                                        </tr>
                                        <tr>
                                            <td>Connection Port</td>
                                            <td>USB 2.0, USB 3.0, Type C, HDMI</td>
                                            <td>USB 2.0, USB 3.0, Type C, HDMI</td>
                                        </tr>
                                    </>
                                }
                            </tbody> :
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                }
            </div>
        </div >
    );
}

export default Compare;