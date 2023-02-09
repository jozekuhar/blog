import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { Home, Navbar, PostList, PostDetail, PostShare, NotFound } from "./components"
import "./App.css"
import "./axios/global"
import { PostsContext } from "./context/PostsContext"
import axios from "axios"
import UserPostList from "./components/UserPostList"

function App() {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/blog/posts/`)
        setPosts(response.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  return (
    <>
    <PostsContext.Provider value={posts}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts">
          <Route index element={<PostList />}/>
          <Route path=":id" element={<PostDetail />} />
          <Route path=":id/share" element={<PostShare />} />
        </Route>
        <Route path="/users/:username" element={<UserPostList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PostsContext.Provider>
    </>
  )
}

export default App
