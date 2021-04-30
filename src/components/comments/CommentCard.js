import React from "react"
import "./Comment.css"



export const CommentCard = ({ commentInstance, commentAuthor }) => (
    <section className="comment">
        <p className="commentContent">{ commentInstance?.content }</p>
        <p className="commentContent">Author: { commentAuthor?.first_name } { commentAuthor?.last_name }</p>
        <div className="commentPublicationDate">-{ commentInstance?.created_on }</div>
    </section>
)