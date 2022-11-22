import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteTag, getTags } from "../../managers/TagManager"
import './TagList.css'

export const TagList = () => {

    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getTags()
                .then(data => setTags(data))
        },
        []
    )

    //  handles confirmation of deletion via a popup
    const tagDelete = (evt, tag) => {
        let text = 'Are you sure you want to delete this tag?'
        window.confirm(text)
            ? deleteTag(tag.id).then(() => { window.location.reload() })
            : <></>
    }

    return <section className="tags__list">
        <h2 className="tag__header title mt-6">Tags</h2>
        {
            tags.map(tag => {
                return <div key={`tag--${tag.id}`} className="tag columns" id="tags">
                    <div className="column"><h3 className="subtitle is-5 is-marginless">{tag.name}</h3></div>
                    <div className="tag__buttons column">
                        <button className="tag__button button is-small is-responsive is-success " onClick={() => navigate(`/tags/${tag.id}`)}>Edit</button>
                        <button className="tag__button button is-small is-responsive is-danger" onClick={(evt) => { tagDelete(evt, tag) }}>Delete</button>
                    </div>
                </div>
            })
        }
    </section>
}