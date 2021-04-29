import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"

export const CategoryDetail = () => {
    const { getCategories, getCategoryById, deleteCategory, updateCategory } = useContext(CategoryContext)
    const [ category, setCategory ] = useState({})
    const { categoryId } = useParams()
    const history = useHistory()

    const handleDelete = () => {
        deleteCategory(category.id)
            .then(() => {
                history.push("/categories")
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getCategoryById(categoryId)
            .then((response) => {
                setCategory(response)
            })
    }, [])

    return (
        <>
            <section className="category">
                <div className="categoryLabel">Category: {category?.label}</div>
                <button onClick={handleDelete}>Delete Category</button>
                <button onClick={() => { history.push(`/category/manage/${category?.id}`) }}>Edit</button>
            </section>
        </>
    )
}