import React from 'react'
import styled from 'styled-components'
import moment from "moment"
import { Link } from "react-router-dom"


function Post(props) {
  const context = props.context
  console.log(context)
  const { id, title, body, publish, author } = props.post

  const publishFormated = moment(publish).format('MMM Do YYYY, h:mm a')

  console.log(props.titleLink)
  return (
    <Container>
      <Link to={`${props.titleLink}`}><Title>{title}</Title></Link>
      <Info>Published {publishFormated} by {author.username}</Info>
      <Text>{body}</Text>
      <Link to={`${props.shareLink}`}><Share>Share this post</Share></Link>
    </Container>
  )
}

const Container = styled.div`
  background-color: #F8F8F8;
  margin: 20px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const Title = styled.div`
  padding: 20px;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
  a {
    all: inherit;
    padding: 0;
    cursor: pointer;
  }
`
const Info = styled.div`
  padding: 0 20px 0 20px;
  font-size: 12px;
  font-style: italic;
  color: #7C7C7C;
`
const Text = styled.div`
  padding: 20px 20px 10px 20px;
  color: #170A1C;
  font-size: 16px;
  line-height: 24px;
`
const Share = styled.p`
  font-size: 1rem;
  color: #0B7189;
  /* text-decoration: underline; */
  padding: 0 0 20px 20px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export default Post