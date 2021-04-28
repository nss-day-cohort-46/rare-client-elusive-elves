import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { PostCard } from "./PostCard"
import "./Post.css"
import { useHistory } from "react-router-dom"


export const PostList = () => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)

    // useState to return filtered posts
    const [ filteredPosts, setFiltered ] = useState([])
    const history = useHistory()
  
    // Initialization effect hook -> Go get post data
    useEffect(()=>{
      getPosts()
    }, [])
  
    useEffect(() => {
      if (searchTerms !== "") {
        // If the search field is not blank, display matching posts
        const subset = posts.filter(post => post.title.toLowerCase().includes(searchTerms.toLowerCase))
        setFiltered(subset)
      } else {
        // If the search field is blank, display all posts
        setFiltered(posts)
      }
    }, [searchTerms, posts])

      return (
        <>
            <h1>Posts</h1>

            <button onClick={() => history.push("/posts/create")}>
                New Post
            </button>
            <div className="posts">
                {
                    filteredPosts.map(postObject => {
                        return <PostCard key={postObject.id} postInstance={postObject} />
                    })
                }
            </div>
        </>
    )
}