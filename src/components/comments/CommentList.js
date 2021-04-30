import React, { useState, useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider"

import { CommentCard } from "./CommentCard"
import "./Comment.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"



export const CommentList = () => {
    const { getComments, comments } = useContext(CommentContext)
    const { getUsers, users } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)

    // useState to return filtered comments
    
    const history = useHistory()
  
    // Initialization effect hook -> Go get comment data
    useEffect(()=>{
        getUsers()
        getComments()
      getCategories()
    }, [])
  
    


    const commentsSorted = comments.sort(
      (currentComment, nextComment) =>
          Date.parse(nextComment.publication_date) - Date.parse(currentComment.publication_date)
    )
  
      return (
        <>
            <div className="comments">
                {
                    comments.map(commentObject => {
                      
                        const author = users.find(u => parseInt(u.id) === parseInt(commentObject.author_id))

                        return <CommentCard key={commentObject.id} commentInstance={commentObject} 
                        commentAuthor = {author}
                        
                        />
                    })
                }
            </div>
        </>
    )
}