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
        <h2 className="tag__header title">Tags</h2>
    </section>
}