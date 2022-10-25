import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTagById } from "../../managers/TagManager"

export const TagEdit = () => {

    const { tagId } = useParams()
    const [tag, setTag] = useState({ label: "" })
    const navigate = useNavigate()

    const controlInputChange = () => {

    }

    useEffect(() => {
        getTagById(tagId)
            .then((res) => {
                setTag(res)
            })
    }, [tagId])

    return <section className="tags__list">
        <h2 className="tag__header title">Update Tag</h2>
        <div class="tag__update field box is-centered">
            <label class="label"><span className="tag__text">Tag Name</span></label>
            <div class="control">
                <input class="input" type="text" placeholder="Enter New Tag" />
                <div className="field">
                    <button className="btn__update button is-link">Update</button>
                    <button type="button" className="btn__update button is-light" onClick={() => navigate(`/tags`)}>Go Back</button>
                </div>
            </div>
        </div>
    </section>
}