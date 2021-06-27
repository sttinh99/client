import React, { useRef } from 'react';

import './Comments.css'

function Comments({ id, socket, name, idProduct }) {
    const contentRef = useRef()
    const commentSubmit = () => {
        const content = contentRef.current.innerHTML
        if (contentRef.current.textContent.trim().length < 1) {
            return alert("Comment is not valid");
        }
        const createAt = new Date().toISOString()
        socket.emit('createcomment', {
            user_id: id, username: name, content, product_id: idProduct, createAt
        })
        contentRef.current.innerHTML = "";

    }
    return (
        <div className="form-input">
            <span>Name: </span><strong>{name}</strong>
            <p>Content:</p>
            <div ref={contentRef} contentEditable="true" style={{
                height: '50px',
                padding: '5px 10px',
                outline: 'none',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '-5px 5px 16px -5px'
            }}
                suppressContentEditableWarning={true}
            > </div>
            <button onClick={commentSubmit}>Send</button>
        </div >
    );
}

export default Comments;