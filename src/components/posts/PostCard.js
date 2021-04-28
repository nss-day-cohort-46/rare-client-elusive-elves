import React from "react"
import "./Post.css"
import { Link } from "react-router-dom"



export const PostCard = ({ postInstance }) => (
    <section className="post">
        <h3 className="postTitle">
          <Link to={`/posts/detail/${postInstance.id}`}>
            { postInstance.title }
          </Link>
        </h3>
        <div className="postPublicationDate">{ postInstance.publication_date }</div>
    </section>
)