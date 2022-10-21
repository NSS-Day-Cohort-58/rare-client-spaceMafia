import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { PostDetails } from "../components/posts/PostDetails"
import { CategoryList } from "../components/categories/CategoryList"
import { AllPosts } from "../components/posts/PostList"
import { TagContainer } from "../components/tags/TagContainer"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        
        <Route path="/tags" element={<TagContainer/>} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/categories" element={<CategoryList />} />

      </Route>
    </Routes>
  </>
}
