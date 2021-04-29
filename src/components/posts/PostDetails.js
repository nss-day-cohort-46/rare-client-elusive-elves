import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"

export const PostDetail = () => {
  

    const { getPostById, deletePost, getPosts, posts} = useContext(PostContext)
    const { users, getUsers } = useContext(UserContext)
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
        getUsers()
        getPosts()
    }, [])



    useEffect(() => {

        getPostById(postId)
        .then((response) => {
            setPost(response)
        })
    }, [])
    
    const author = users.find(u => parseInt(u.id) === parseInt(post?.user_id))
    
    return (
        
        <>
        <section className="post">
            <h3 className="postTitle">{post?.title}</h3>
            <div className="postId">Post ID: {post?.id}</div>
            <div className="postAuthor">Author: {author?.first_name} {author?.last_name}</div>
            <div className="postCategory">Category: {post?.category}</div>
            <div className="postPublicationDate">Publication Date: {post?.publication_date}</div>
            <div className="postContent">Content: {post?.content}</div>
            <button onClick={handleDelete}>Delete Post</button>
            <button onClick={() => {history.push(`/posts/edit/${post?.id}`)}}>Edit</button>
        </section>
        </>
    )
}