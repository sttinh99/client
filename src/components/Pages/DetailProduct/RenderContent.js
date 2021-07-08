import React from 'react';

function RenderContent({ desItem, componentItem, category }) {
    return (
        <tbody className="show-detail">
            {
                desItem.map((item, index) => {
                    //console.log(limitRelated);
                    return <tr key={index}>
                        <td>{componentItem[index]}</td>
                        <td>{item}</td>
                    </tr>
                })
            }
            {
                category = "laptop" && <><tr>
                    <td>Wireless Lan</td>
                    <td>802.11ac 2×2 Wi-Fi</td>
                </tr>
                    <tr>
                        <td>Lan</td>
                        <td>Gigabit Ethernet</td>
                    </tr>
                    <tr>
                        <td>Connection Port</td>
                        <td>USB 2.0, USB 3.0, Type C, HDMI</td>
                    </tr>
                </>
            }
        </tbody>
    );
}

export default React.memo(RenderContent);