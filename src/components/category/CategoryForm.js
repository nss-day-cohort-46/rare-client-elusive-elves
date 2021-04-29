import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { CategoryContext } from './CategoryProvider'

export const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext)
    const [category, setCategory] = useState({})
    const history = useHistory()

    const handleInputChange = e => {
        // pass all key:value pairs from ...category 
        const newCategory = {...category}
        newCategory[e.target.id] = e.target.value
        setCategory(newCategory)
    }

    const handleSubmit = () => {
        addCategory(category)
        history.push("/categories")
    }

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