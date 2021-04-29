import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { CategoryContext } from './CategoryProvider'

export const CategoryForm = () => {
    const { getCategories, addCategory, getCategoryById, deleteCategory, updateCategory } = useContext(CategoryContext)
    const { categoryId } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    //Define the intial state of the Category with useState()
    const [category, setCategory] = useState({
        label: ""
    })

    //track changes to form, update state variable with setCategory
    const handleInputChange = e => {
        // pass all key:value pairs from ...category 
        const newCategory = { ...category }
        newCategory[e.target.id] = e.target.value
        setCategory(newCategory)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (categoryId) {
            updateCategory(category)
                .then(history.push(`/categories`))
        } else {
            addCategory(category)
            history.push("/categories")
        }
    }

    useEffect(() => {
        getCategories().then(() => {
            if (categoryId) {
                getCategoryById(categoryId)
                    .then(category => {
                        setCategory(category)

                        setIsLoading(false)
                    })
            } else {
                // else there is no data
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <section className="category_form">
            <h2>Create a Category</h2>
            <input type="text"
                placeholder="Enter new category"
                id="label"
                onChange={handleInputChange}></input>
            <button onClick={handleSubmit}>Submit</button>
        </section>
    )
}