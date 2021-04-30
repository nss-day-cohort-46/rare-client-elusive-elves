import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"
import { CommentForm } from "../comments/CommentForm"
import { CommentList } from "../comments/CommentList"
import { SubscriptionContext } from "../subscriptions/SubscriptionProvider"


export const PostDetail = () => {
  
    const { getPostById, deletePost, getPosts, posts, updatePost} = useContext(PostContext)
    const { deleteSubscription, addSubscription } = useContext(SubscriptionContext)
    const { users, getUsers } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const [post, setPost] = useState({})
	const {postId} = useParams();
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("rare_user_id"))
    const [ isLoading, setIsLoading ] = useState(true);
    const date = new Date
    const author_id = post?.user_id

    const subscription = {
        author_id,    
        follower_id: parseInt(localStorage.getItem("rare_user_id")),
        created_on: date.toLocaleString(),
        ended_on: ""      
    }

    const handleDelete = () => {
        deletePost(post.id)
        .then(() => {
            history.push("/posts")
        })
    }
    
    const handleEdit = () => {  
        updatePost(post)
        history.push(`/posts/edit/${post?.id}`)    
    }
    
    const handleSubscribe = () => {    
        debugger
            
        addSubscription(subscription)
    }

    

    useEffect(() => {
        getUsers()
        getPosts()
        getCategories()
    }, [])



    useEffect(() => {

        getPostById(postId)
        .then((response) => {
            setPost(response)
        })
    }, [])
    
    const author = users.find(u => parseInt(u.id) === parseInt(post?.user_id))
    const category = categories.find(c => parseInt(c.id) === parseInt(post?.category_id))

    

   
    let is_user = ""
    if(currentUser === post?.user_id) {
        is_user = 1
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
            
            
            { is_user ? <button className="btn btn-primary"
                
                onClick={handleEdit}>
                Edit
            </button> : "" }
            { is_user ? <button className="btn btn-primary"
                
                onClick={handleDelete}>
                Delete
            </button> : "" }

            { is_user ? "" : <button className="btn btn-primary"
                
                onClick={handleSubscribe}>
                Subscribe
            </button> }
            
            <CommentForm />
            <CommentList />
            
        </section>
        </>
    )
}