import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"

import { PostCard } from "./PostCard"
import "./Post.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"
import { TagContext } from "../tags/TagsProvider"



export const PostList = () => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)
    const { getUsers, users } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const { tags, getTags, getPostTags } = useContext(TagContext)

    // useState to return filtered posts
    const [ filteredPosts, setFiltered ] = useState([])
    const history = useHistory()
  
    
    //state variable for post-tags
    const [postTags, setPostTags] = useState([])

    // Initialization effect hook -> Go get post data
    useEffect(()=>{
      getPosts()
      getUsers()
      getCategories()
      getTags()
      getPostTags().then(setPostTags)
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
    setFiltered(postsSorted)


    //filter by tags
    const handleTagFilter = (e) => {
      tagId = parseInt(e.target.id)
      postsWithThisTag = postTags.filter(pt => pt.tag_id === tagId)
      matchingPosts = postsSorted.filter(post => post.id === postsWithThisTag.post_id)
      setFiltered(matchingPosts)
    }




      return (
        <>
            <h1>Posts</h1>

            <button onClick={() => history.push("/posts/create")}>
                New Post
            </button>
            <div className="posts">
                {
                    filteredPosts.map(postObject => {
                      
                        const author = users.find(u => parseInt(u.id) === parseInt(postObject.user_id))
                        const category = categories.find(c => parseInt(c.id) === parseInt(postObject.category_id))

                        return <PostCard key={postObject.id} postInstance={postObject} 
                        postAuthor = {author}
                        postCategory = {category}
                        />
                    })
                }
            </div>
            <aside className="tags">
                {tags.map(tag => {
                  <button id={`tagBtn--${tag.id}`} onClick={}>{tag.label}</button>
                })}
            </aside>
        </>
    )
}