import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTagById, saveEditedTag } from "../../managers/TagManager"

export const TagEdit = () => {

    const navigate = useNavigate()
    const { tagId } = useParams()
    const [newTag, setNewTag] = useState({ label: "" })
    const [tag, setTag] = useState({
        label: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        const newTag = {
            id: tag.id,
            label: tag.label
        }

        saveEditedTag(newTag)
            .then(() => navigate("/tags"))
    }

    // const handleControlledInputChange = (event) => {
    //     const newTag = Object.assign({}, tag)
    //     newTag[event.target.name] = event.target.value
    //     setAnimal(newTag)
    // }

    const renderTag = () => {
        if (tagId) {
            getTagById(tagId).then((res) => {
                setTag(res)
            })
        }
    }
    useEffect(() => {
        renderTag()
    }, [tagId])

    return <section className="tags__list">
        <h2 className="tag__header title">Update Tag</h2>
        <div className="tag__update field box is-centered">
            <label className="label"><span className="tag__text">Tag Name</span></label>
            <div className="control">
                <input className="input" type="text" placeholder={tag.label}
                    onChange={(e) => {
                        const copy = { ...tag }
                        copy.label = e.target.value
                        setTag(copy)
                    }} />
                <div className="field">
                    <button className="btn__update button is-link" onClick={(e) => handleSubmit(e)}>Update</button>
                    <button type="button" className="btn__update button is-light" onClick={() => navigate(`/tags`)}>Go Back</button>
                </div>
            </div>
        </div>
    </section>
}