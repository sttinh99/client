import React, { useRef } from 'react';
import axios from 'axios'

import './Comments.css'

function Comments({ id, socket, name, idProduct, rating, token }) {
    const contentRef = useRef()
    const commentSubmit = async () => {
        if (!rating || rating === 0) {
            return alert("Please vote rate. Thanks");
        }
        const content = contentRef.current.innerHTML
        if (contentRef.current.textContent.trim().length < 1) {
            return alert("Comment is not valid");
        }
        const createAt = new Date().toISOString()
        socket.emit('createcomment', {
            user_id: id, username: name, content, product_id: idProduct, createAt, rating
        })
        await axios.patch(`/products/review/${idProduct}`, { rating }, {
            headers: { Authorization: token }
        })

        contentRef.current.innerHTML = "";
    }
    return (
        <div className="form-input">
            <span>Name: </span><strong>{name}</strong>
            <div ref={contentRef} contentEditable="true" style={{
                height: '70px',
                padding: '5px 10px',
                outline: 'none',
                background: '#fff',
                borderRadius: '10px',
            }}
                suppressContentEditableWarning={true}
            > </div>
            <button onClick={commentSubmit}>Send</button>
        </div >
    );
}

export default Comments;