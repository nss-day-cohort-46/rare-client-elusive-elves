import React from "react"

export const CategoryCard = ({categoryInstance}) => (
    <section className="Category">   
        <h3 className="CategoryTitle" id={categoryInstance.id}> {categoryInstance.label} </h3>
    </section>
)