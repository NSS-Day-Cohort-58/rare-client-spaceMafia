import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTagById } from "../../managers/TagManager"

export const TagEdit = () => {

    const navigate = useNavigate()
    const { tagId } = useParams()
    const [newTag, setNewTag] = useState({ label: "" })
    const [tag, setTag] = useState({
        label: ""
    })

    const controlTagChange = (event) => {

        event.preventDefault()

        const toBeSavedToAPI = {
            label: ""
        }

        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toBeSavedToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/tags`)
            })

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }


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
                    onChange={(evt) => {
                        const copy = { ...tag }
                        copy.tag.label = evt.target.value
                        setNewTag(copy)
                    }} />
                <div className="field">
                    <button className="btn__update button is-link" onClick={(e) => controlTagChange(e)}>Update</button>
                    <button type="button" className="btn__update button is-light" onClick={() => navigate(`/tags`)}>Go Back</button>
                </div>
            </div>
        </div>
    </section>
}