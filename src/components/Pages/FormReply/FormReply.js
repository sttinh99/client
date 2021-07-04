import React, { useState, useCallback, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';

function FormReply({ id, socket, name, setReply, send, myname, user_id, setHideReply }) {

    useEffect(() => {
        if (name) {
            contentRef.current.innerHTML = `
            <a href="#!"
                style="color:black;
                font-weight:bold;"
            >${name}&#160</a>
            `
        }
    }, [name])

    const hideReply = () => {
        setReply(false)
    }
    const contentRef = useRef()
    const commentSubmit = () => {
        const content = contentRef.current.innerHTML
        if (contentRef.current.textContent.trim().length < 1) {
            return alert("Comment is not valid");
        }
        const createAt = new Date().toISOString()
        socket.emit('replycomment', {
            user_id: user_id, myname: myname, content, createAt, yourname: name, send, id
        })
        contentRef.current.innerHTML = "";
        if (setReply) setReply(false)
        setHideReply(true)
    }
    return (
        <form className="form-reply" onSubmit={commentSubmit}>
            <div className="content-rpl">
                <Avatar color={Avatar.getRandomColor(['green'])} size="40" round={true} name={myname[0]} />
                <div ref={contentRef} contentEditable="true" style={{
                    height: '40px',
                    width: '100%',
                    padding: '10px',
                    outline: 'none',
                    background: '#fff',
                    borderRadius: '10px',
                    display: "inline",
                }}
                    suppressContentEditableWarning={true}
                > </div>
            </div>
            {/* <button onClick={loadMore}>load more... </button> */}
            <button onClick={hideReply}>hide comments... </button>
            <button type="submit">Send</button>
        </form>
    );
}

export default FormReply;