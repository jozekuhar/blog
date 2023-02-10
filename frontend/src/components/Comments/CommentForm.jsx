import React, { useState, useContext } from 'react'
import { PostsContext } from '../../context/PostsContext'
import styled from 'styled-components'
import axios from "axios"

function CommentForm(props) {
  const { message, setMessage } = useContext(PostsContext)
  console.log(message)
  const { id } = props.post
  const [formData, setFormData] = useState({
    "post": id,
    "name": "",
    "email": "",
    "body": ""
  })

  function handleChange(e) {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function sendData() {
      try {
        const response = await axios.post("/api/blog/posts/comment/create/", formData)
        setMessage(response.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    sendData()
  }

  return (
    <Container>
      <Title>Add a new comment</Title>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <textarea type="text" name="body" placeholder="Comment" value={formData.body} onChange={handleChange} required />
        <Info>{message ? message.success : <></>}</Info>
        <Button><button>Comment</button></Button>
      </form>
    </Container>
  )
}

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `


const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  form {
    margin: 20px;
    width: 100%;
    max-width: 500px;
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

const Title = styled.div`
  max-width: 400px;
  text-align: center;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
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
const Info = styled.div`
  color: green;
  margin-bottom: 10px;
  text-align: center;
`


export default CommentForm