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
  const [count, setCount] = useState(0)


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/blog/posts/?limit=99999&offset=0`)
        setCount(response.data.count)
        setPosts(response.data.results)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  return (
    <>
    <PostsContext.Provider value={{posts, count}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts">
          <Route index element={<PostList />}/>
          <Route path=":year/:month/:day/:slug" element={<PostDetail />} />
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
