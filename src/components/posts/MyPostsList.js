import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"

import { PostCard } from "./PostCard"
import "./Post.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"

//TODO: make a list so only user posts are visible
export const MyPostList = () => {
    const {getPosts, posts, searchTerms } = useContext(PostContext)
    const { getUsers, users } = useContext(UserContext)

    







}