import { Routes, Route } from "react-router-dom"
import { Home, Navbar, PostList, PostDetail } from "./components"
import styled from "styled-components"
import "./App.css"
import "./axios/global"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="posts">
          <Route index element={<PostList />}/>
          <Route path=":id" element={<PostDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
