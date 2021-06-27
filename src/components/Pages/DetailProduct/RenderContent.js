import React from 'react';

function RenderContent({ desItem, componentItem }) {
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
        </tbody>
    );
}

export default React.memo(RenderContent);