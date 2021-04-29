import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"

import { PostCard } from "./PostCard"
import "./Post.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"



export const PostList = () => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)
    const { getUsers, users } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)

    // useState to return filtered posts
    const [ filteredPosts, setFiltered ] = useState([])
    const history = useHistory()
  
    // Initialization effect hook -> Go get post data
    useEffect(()=>{
      getPosts()
      getUsers()
      getCategories()
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



    const postsSorted = posts.sort(
      (currentPost, nextPost) =>
          Date.parse(nextPost.publication_date) - Date.parse(currentPost.publication_date)
    )
  
      return (
        <>
            <h1>Posts</h1>

            <button onClick={() => history.push("/posts/create")}>
                New Post
            </button>
            <div className="posts">
                {
                    postsSorted.map(postObject => {
                      
                        const author = users.find(u => parseInt(u.id) === parseInt(postObject.user_id))
                        const category = categories.find(c => parseInt(c.id) === parseInt(postObject.category_id))

                        return <PostCard key={postObject.id} postInstance={postObject} 
                        postAuthor = {author}
                        postCategory = {category}
                        />
                    })
                }
            </div>
        </>
    )
}