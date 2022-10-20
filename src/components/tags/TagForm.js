import { useState } from "react"
import { createTag } from "../../managers/TagManager"

export const TagForm = () => {

    const [tag, updateTag] = useState({
        label: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        const newTag = {
            label: tag.label
        }

        createTag(newTag)
        .then(() => {window.location.reload()})
    }

    return <form className="tag__form">
        <h2>Create a New Tag</h2>
        <fieldset>
                <label htmlFor="label"></label>
                <input
                    required autoFocus
                    type="text"
                    name="label"
                    className="form-control"
                    placeholder="Add label for tag"
                    value={tag.label}
                    onChange={
                        (event) => {
                            const copy = {...tag}
                            copy.label = event.target.value
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