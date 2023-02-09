import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { PostsContext } from "../context/PostsContext"
import axios from "axios"

function PostShare() {
  const { id } = useParams()
  const posts = useContext(PostsContext)
  const post = posts.posts.find(post => post.id == id)
  const [formData, setFormData] = useState({
    name: "",
    email_from: "",
    email_to: "",
    comment: "",
  })
  const [response, setResponse] = useState("")

  function handleChange(e) {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function sendEmail() {
      try {
        const response = await axios.post(`/api/blog/posts/${id}/share/`, formData)
        setResponse(response.data)
        setFormData({
          name: "",
          email_from: "",
          email_to: "",
          comment: "",
        })
        const deleteResponse = setTimeout(() => {
          setResponse("")
        }, 2000)
      } catch(error) {
        console.log(error.response)
      }
    }
    sendEmail()
  }

  return (
    <Container>
      {post ? <Title>Share: "{post.title}"</Title> : <></>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="From (Email)"
          name="email_from"
          value={formData.email_from}
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="To (Email)"
          name="email_to"
          value={formData.email_to}
          onChange={handleChange}
        />
        <textarea 
          type="text" 
          placeholder="Comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <Info>
          {response ? "Post was succesfully shared!" : <></>}
        </Info>
        <Button>
          <button>Share Post</button>
        </Button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    margin: 20px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
  }
  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    height: 43px;
    background-color: #E6E6E6;
    border: none;
    resize: none;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    ::placeholder {
      color: #C5C5C5;
      font-size: 1rem;
    }  
  }
  textarea {
    height: 100px;
  }
  
`
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  button {
    width: 100%;
    height: 43px;
    background-color: #9C95DC;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    :active {
      height: 41px;
      width: 99%;
      font-size: 1rem;
      background-color: #9992D9;
    }
  }
`
const Title = styled.div`
  max-width: 400px;
  text-align: center;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
`

const Info = styled.div`
  color: green;
  margin-bottom: 10px;
  text-align: center;
`

export default PostShare