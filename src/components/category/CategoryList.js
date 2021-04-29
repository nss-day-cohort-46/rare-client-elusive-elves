// UNDER CONSTRUCTION

import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { CategoryContext } from "./CategoryProvider"
import { CategoryCard } from "./CategoryCard"


export const CategoryList = () => {
    const { getCategories, addCategory, getCategoryById, deleteCategory, updateCategory, searchTerms} = useContext(CategoryContext)

    // useState to return filtered categories
    const [ filteredcategories, setFiltered ] = useState([])
    const history = useHistory()
  
    // Initialization effect hook -> Go get Category data
    useEffect(() => {
      getcategories()
    }, [])

    return (
      <section className="CategoryList">
        <h1> Category List </h1>
        <button onClick={() => history.push("/posts/create")}> New Category </button>
      </section>    )