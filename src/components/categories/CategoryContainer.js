import { useState } from "react"
import { CategoryForm } from "./CategoryForm"
import { CategoryList } from "./CategoryList"

export const CategoryContainer = () => {
    const [makeCategories, setMadeCategories] = useState("")

    return <>
    <CategoryForm setterFunction={setMadeCategories}/>
    <CategoryList searchCategorysState={makeCategories}/>
    </>
   
}