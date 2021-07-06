import React, { useState } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment'

import FormReply from '../FormReply/FormReply';

import './CommentItem.css'
import Rating from '../Rating/Rating';

function CommentItem({ comment, id, socket, name, idProduct }) {
    const [reply, setReply] = useState(false);
    const [hideReply, setHideReply] = useState(false);
    const [yourname, setYourname] = useState('')

    const handleOnReply = (name) => {
        setReply(true)
        setYourname(name)
    }
    const showReply = () => {
        setHideReply(!hideReply)
    }
    return (
        <div className='comment-item'>
            <div className="avt-user">
                <Avatar color={Avatar.getRandomColor(['green'])} size="40" round={true} name={comment.username[0]} />
            </div>
            <div className="cmt">
                <div className="block-cmt">
                    <div className="username">
                        <p>{comment.username}</p>
                        {
                            comment.rating !== 0 && <Rating product={comment} />
                        }
                    </div>
                    <p className="comment" dangerouslySetInnerHTML={{ __html: comment.content }} />
                </div>
                <div className="time-rpl">
                    {
                        name ? <span className="reply" onClick={() => handleOnReply(comment.username)}>reply . </span> : ""

                    }
                    <span className="show-reply" onClick={showReply}>{hideReply ? "hide reply" : "show reply"}</span>
                    <span> . {moment(comment.createdAt).fromNow()}</span>
                </div>
                {
                    hideReply && <div className="reply-comment">
                        {
                            comment.reply.map((rep, index) => (
                                <div className="yourname-cmt" key={index}>
                                    <div className="block-yourname">
                                        <Avatar color={Avatar.getRandomColor(['green'])} size="40" round={true} name={rep.myname} />
                                        <div className="block-cmt">
                                            <p className="username">{rep.myname}</p>
                                            <p className="comment" dangerouslySetInnerHTML={{ __html: rep.content }} />
                                        </div>
                                    </div>
                                    <div className="time-rpl">
                                        <span>{moment(rep.createAt).fromNow()}</span>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                }
                {
                    reply && <FormReply
                        id={comment._id}
                        socket={socket}
                        name={yourname}
                        setReply={setReply}
                        send="replyComment"
                        myname={name}
                        user_id={id}
                        setHideReply={setHideReply}
                    />
                }
            </div>
        </div>
    );
}

export default CommentItem;