import { TagForm } from "./TagForm"
import { TagList } from "./TagList"

export const TagContainer = () => {

    return <section className="tag__main">
        <TagList/>
        <TagForm/>
    </section>
}