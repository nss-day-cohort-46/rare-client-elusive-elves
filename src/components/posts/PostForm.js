//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { PostContext } from "../posts/PostProvider";


//export function to display form for new post
export const PostForm = () => {
    
    const { addPost, getPostById, updatePost, getPosts } = useContext(PostContext)
    const { postId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory();
    const date = new Date


    //Define the intial state of the Post with useState()
    const [post, setPost] = useState({
        user_id: parseInt(localStorage.getItem("rare_user_id")),
        category_id: "",
        title: "",
        publication_date: date.toLocaleString(),
        content: ""      
    });




    //when something changes, save it with setPost
    const handleControlledInputChange = (event) => {
        //make a new copy of post
        const newPost = { ...post }
        //the value of the event
        let selectedVal = event.target.value

        /* Set the property to the new value
        using object bracket notation. */
        newPost[event.target.id] = selectedVal
        
        // update state
        setPost(newPost)   
    }

    //handle save function
    const handleClickSavePost = (event) => {
        //Prevents the browser from submitting the form
        event.preventDefault() 
        
       //if in the edit page, editPost() then navigate to inspections 
       if (postId) {
        updatePost(post)
        .then(history.goBack)
        
        } else {
       
        //create a new Post then move to post details
        addPost(post)
        .then( p => {
            p = p
            history.push(`/posts/detail/${p.id}`)
        })   
      
    }}
    //handle save function
    const handleClickCancel = () => {
        history.push(`/posts/detail/${postId}`)
    }

    useEffect(() => {
        //get all Posts
        getPosts().then(() => {

        // if postID exists
        if (postId) {
            //get that post
            getPostById(postId)
            //then setPost to that found Post
            .then(Post => {
                setPost(Post)
                
                setIsLoading(false)
            })
        } else {
            // else there is no data
            setIsLoading(false)
        }
        })
    }, [])


    //Return this HTML
    return (
        <>
        <article className="postContainer">
        <form className="postForm">
            <h2 className="formTitle">Post</h2>
            <div id="posts">
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Title" value={post.title}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="category_id">Category: </label>
                    <input type="text" id="category_id" onChange={handleControlledInputChange} className="form-control" placeholder="Category" value={post.category_id}/>
                </div>
            </fieldset>
            {/* <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="publication_date">Publication Date: </label>
                    <input type="text" id="publication_date" onChange={handleControlledInputChange} className="form-control" placeholder="Publication Date" value={post.publication_date}/>
                </div>
            </fieldset> */}
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="content">Content: </label>
                    <input type="text" id="content" onChange={handleControlledInputChange} className="form-control" placeholder="Content" value={post.content}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                
                onClick={handleClickSavePost}>
                Save Post
            </button>
            
            { postId ? <button className="btn btn-primary"
                
                onClick={handleClickCancel}>
                Cancel
            </button> : "" }
            
            
        </form>
        </article>
        </>
    )
}
