import { useState } from "react"
import { createTag } from "../../managers/TagManager"
import './TagForm.css'

export const TagForm = () => {

    const [tag, updateTag] = useState({
        name: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        const newTag = {
            name: tag.name
        }

        createTag(newTag)
            .then(() => { window.location.reload() })
    }

    return <form className="tag__form">
        <h2 className="subtitle">Create a New Tag</h2>
        <fieldset>
            <label htmlFor="label"></label>
            <input
                required autoFocus
                type="text"
                name="label"
                className="form-control"
                placeholder="Add label for tag"
                value={tag.name}
                onChange={
                    (event) => {
                        const copy = { ...tag }
                        copy.name = event.target.value
                        updateTag(copy)
                    }
                }
            />
        </fieldset>
        <button
            onClick={(event) => handleSubmit(event)}
            className="button"
        >Create</button>
    </form>
}