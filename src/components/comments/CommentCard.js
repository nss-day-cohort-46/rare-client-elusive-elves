import React, { useContext, useEffect } from "react"
import "./Comment.css"
import { useParams, useHistory } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import { UserContext } from "../users/UserProvider"




export const CommentCard = ({ commentInstance, commentAuthor }) => {
    const history = useHistory()
    const { deleteComment, updateComment, getComments } = useContext(CommentContext)
    const { getUsers, users } = useContext(UserContext)


    useEffect(()=>{
        getUsers()
        getComments()
    }, [])

    const handleDelete = () => {
        deleteComment(commentInstance.id)
        .then(() => {
            history.push("/posts")
        })
    }

   

    const currentUser = parseInt(localStorage.getItem("rare_user_id"))
    const author = users.find(u => parseInt(u.id) === parseInt(commentInstance.author_id))
    
    let is_user = ""

    if(currentUser === commentInstance?.author_id) {
        is_user = 1
    }

    return (
    <section className="comment">
        <p className="commentContent">{ commentInstance?.content }</p>
        <p className="commentContent">Author: { author?.first_name } { commentAuthor?.last_name }</p>
        <div className="commentPublicationDate">-{ commentInstance?.created_on }</div>
        
        { is_user ? <button className="btn btn-primary"
                
                onClick={handleDelete}>
                Delete
            </button> : "" }
        
        

    </section>
)}