import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { PostDetails } from "../components/posts/PostDetails"
import { AddPost } from "../components/posts/PostForm"
import { AllPosts } from "../components/posts/PostList"
import { TagContainer } from "../components/tags/TagContainer"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/posts/MyPosts"
import { CategoryContainer } from "../components/categories/CategoryContainer"
import { UserList } from "../components/users/UserList"
import { TagEdit } from "../components/tags/TagEdit"
import { UserDetails } from "../components/users/UserDetails"
import { UpdateCategory } from "../components/categories/UpdateCategory"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>

        <Route path="/tags" element={<TagContainer />} />
        <Route path="/tags/:tagId" element={<TagEdit />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/" element={< AllPosts token={token}/>}/>
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/categories" element={<CategoryContainer />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/newPosts" element={<AddPost />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/newPosts" element={<AddPost />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/users/:userId" element={<UserDetails />} />
        <Route path="categories/:categoryId/edit" element={ <UpdateCategory /> } />
      </Route>
    </Routes>
  </>
}
