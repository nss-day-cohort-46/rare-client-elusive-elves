import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostProvider } from "./posts/PostProvider"
import { PostDetail } from "./posts/PostDetails"
import { PostForm } from "./posts/PostForm"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <PostProvider>
            <Route exact path="/">
                <PostList />
            </Route>
            <Route exact path="/posts/detail/:postId(\d+)">
                <PostDetail />
            </Route>
            <Route exact path="/posts/edit/:postId(\d+)">
                <PostForm />
            </Route>
            <Route exact path="/posts/create">
                <PostForm />
            </Route>
        </PostProvider>
        </main>
    </>
}
