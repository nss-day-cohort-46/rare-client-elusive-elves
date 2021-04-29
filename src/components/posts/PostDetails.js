import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"

export const PostDetail = () => {
  

    const { getPostById, deletePost, getPosts, posts} = useContext(PostContext)
    const { users, getUsers } = useContext(UserContext)
    const { categories } = useContext(CategoryContext)
    const [post, setPost] = useState({})
	const {postId} = useParams();
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("rare_user_id"))
    const [ isLoading, setIsLoading ] = useState(true);

    const handleDelete = () => {
        deletePost(post.id)
        .then(() => {
            history.push("/posts")
        })
    }

    const handleEdit = () => {
        
        
            history.push(`/posts/edit/${post?.id}`)
        
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
    const category = categories.find(c => parseInt(c.id) === parseInt(post?.category_id))

    

   
    let deletable = ""
    if(currentUser === post?.user_id) {
        deletable = 1
    }
    

    return (
        
        <>
        <section className="post">
            <h3 className="postTitle">{post?.title}</h3>
            <div className="postId">Post ID: {post?.id}</div>
            <div className="postAuthor">Author: {author?.first_name} {author?.last_name}</div>
            <div className="postCategory">Category: {category?.label}</div>
            <div className="postPublicationDate">Publication Date: {post?.publication_date }</div>
            <div className="postContent">Content: {post?.content}</div>
            
            { deletable ? <button className="btn btn-primary"
                
                onClick={handleDelete}>
                Delete
            </button> : "" }
            { deletable ? <button className="btn btn-primary"
                
                onClick={handleEdit}>
                Edit
            </button> : "" }
            
            
            
        </section>
        </>
    )
}