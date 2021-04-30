//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CommentContext } from "../comments/CommentProvider";


//export function to display form for new comment
export const CommentForm = () => {
    
    const { addComment, getCommentById, updateComment, getComments } = useContext(CommentContext)
    const { commentId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory();
    const date = new Date


    //Define the intial state of the Comment with useState()
    const [comment, setComment] = useState({
        author_id: parseInt(localStorage.getItem("rare_user_id")),
        post_id: "",
        created_on: date.toLocaleString(),
        content: ""      
    });




    //when something changes, save it with setComment
    const handleControlledInputChange = (event) => {
        //make a new copy of comment
        const newComment = { ...comment }
        //the value of the event
        let selectedVal = event.target.value

        /* Set the property to the new value
        using object bracket notation. */
        newComment[event.target.id] = selectedVal
        
        // update state
        setComment(newComment)   
    }

    //handle save function
    const handleClickSaveComment = (event) => {
        //Prevents the browser from submitting the form
        event.preventDefault() 
        
       
       if (commentId) {
        updateComment(comment)
        .then(history.goBack)
        
        } else {
       
        //create a new Comment then move to comment details
        addComment(comment)
        // .then( c => {
        //     c = c
        //     history.push(`/comments/detail/${c.id}`)
        // })   
      
    }}
    //handle save function
    const handleClickCancel = () => {
        history.push(`/comments/detail/${commentId}`)
    }

    useEffect(() => {
        //get all Comments
        getComments().then(() => {

        // if commentID exists
        if (commentId) {
            //get that comment
            getCommentById(commentId)
            //then setComment to that found Comment
            .then(Comment => {
                setComment(Comment)
                
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
        <article className="commentContainer">
        <form className="commentForm">
            <h3 className="formTitle">Comment</h3>
            <div id="comments">
                <fieldset className="checkbox">
                    <div className="form-group">
                        <label htmlFor="newComment">Comment:</label><br></br>
                        <textarea id="content" cols="50" rows="15" 
                        onChange={handleControlledInputChange} required className="form-control" placeholder="Comment" value={comment.content}/>
                    </div>
                </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                
                onClick={handleClickSaveComment}>
                Save
            </button>
            
            { commentId ? <button className="btn btn-primary"
                
                onClick={handleClickCancel}>
                Cancel
            </button> : "" }
            
            
        </form>
        </article>
        </>
    )
}
