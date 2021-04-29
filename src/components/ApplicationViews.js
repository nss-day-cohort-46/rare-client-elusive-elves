import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostProvider } from "./posts/PostProvider"
import { PostDetail } from "./posts/PostDetails"
import { PostForm } from "./posts/PostForm"
import { CategoryProvider } from "./category/CategoryProvider"
import { CategoryList } from "./category/CategoryList"
import { CategoryForm } from "./category/CategoryForm"
import { UserProvider } from "./users/UserProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <PostProvider>
            <UserProvider>
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
            </UserProvider>
        </PostProvider>
        <CategoryProvider>  
            <Route exact path="/categories">
                <CategoryList />
            </Route>
            <Route exact path="/categories/create">
                <CategoryForm />
            </Route>
        </CategoryProvider>
        </main>
    </>
}
