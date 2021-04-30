import React from "react"
import { Link } from "react-router-dom"

export default ({ tag }) => (
    <section className="singleTag">
        <h3 className="tag__title">
          {tag.label}
        </h3>
    </section>
)