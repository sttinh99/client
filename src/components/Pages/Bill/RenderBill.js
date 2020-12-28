import React from 'react';

function RenderBill(props) {
    return (
        {
            < tr className = "service" >
                                    <td className="tableitem"><p className="itemtext">Communication</p></td>
                                    <td className="tableitem"><p className="itemtext">5</p></td>
                                    <td className="tableitem"><p className="itemtext">$375.00</p></td>
                                </tr >
                                <tr className="service">
                                    <td className="tableitem"><p className="itemtext">Asset Gathering</p></td>
                                    <td className="tableitem"><p className="itemtext">3</p></td>
                                    <td className="tableitem"><p className="itemtext">$225.00</p></td>
                                </tr>
                                <tr className="service">
                                    <td className="tableitem"><p className="itemtext">Design Development</p></td>
                                    <td className="tableitem"><p className="itemtext">5</p></td>
                                    <td className="tableitem"><p className="itemtext">$375.00</p></td>
                                </tr>
                                <tr className="service">
                                    <td className="tableitem"><p className="itemtext">Animation</p></td>
                                    <td className="tableitem"><p className="itemtext">20</p></td>
                                    <td className="tableitem"><p className="itemtext">$1500.00</p></td>
                                </tr>
                                <tr className="service">
                                    <td className="tableitem"><p className="itemtext">Animation Revisions</p></td>
                                    <td className="tableitem"><p className="itemtext">10</p></td>
                                    <td className="tableitem"><p className="itemtext">$750.00</p></td>
                                </tr>
                                <tr className="tabletitle">
                                    <td />
                                    <td className="Rate"><h2>tax</h2></td>
                                    <td className="payment"><h2>$419.25</h2></td>
                                </tr>
                                <tr className="tabletitle">
                                    <td />
                                    <td className="Rate"><h2>Total</h2></td>
                                    <td className="payment"><h2>$3,644.25</h2></td>
                                </tr>
}
    );
}

export default RenderBill;