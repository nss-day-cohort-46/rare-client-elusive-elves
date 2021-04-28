import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"

import "./Post.css"
import { useParams, useHistory } from "react-router-dom"

export const PostDetail = () => {
  
  const { getPostById, deletePost } = useContext(PostContext)

	const [post, setPost] = useState({})

	const {postId} = useParams();
  
  const history = useHistory()

  const handleDelete = () => {
    deletePost(post.id)
      .then(() => {
        history.push("/posts")
      })
  }


  useEffect(() => {

    getPostById(postId)
    .then((response) => {
      setPost(response)
    })
    }, [])
  return (
    <section className="post">
      <h3 className="postTitle">{post?.title}</h3>
      <div className="postId">Post ID: {post?.id}</div>
      <div className="postUserId">User ID: {post?.user_id}</div>
      <div className="postCategory">Category: {post?.category}</div>
      <div className="postPublicationDate">Publication Date: {post?.publication_date}</div>
      <div className="postContent">Content: {post?.content}</div>
      <button onClick={handleDelete}>Delete Post</button>
      <button onClick={() => {history.push(`/posts/edit/${post?.id}`)}}>Edit</button>
    </section>
  )
}