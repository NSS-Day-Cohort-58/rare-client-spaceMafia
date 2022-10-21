import { TagForm } from "./TagForm"
import { TagList } from "./TagList"
import './TagContainer.css'

export const TagContainer = () => {

    return <section className="tag__main">
        <TagList/>
        <TagForm/>
    </section>
}