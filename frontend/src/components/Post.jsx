import React from 'react'
import styled from 'styled-components'
import moment from "moment"
import { Link } from "react-router-dom"
import Tag from './Tags/Tag'


function Post(props) {
  const { id, title, slug, body, publish, author, comments, tags } = props.post
  
  const publishFormated = moment(publish).format('MMM Do YYYY, h:mm a')
  const year = moment(publish).format("YYYY")
  const month = moment(publish).format("MM")
  const day = moment(publish).format("DD")

  console.log(tags)

  const listTags = tags.map(tag => {
    return <Tag key={tag.id} tag={tag} />
  })

  return (
    <Container>
      <Link to={`/posts/${year}/${month}/${day}/${slug}`}><Title>{title}</Title></Link>
      <Tags>{listTags}</Tags>
      <Info>Comments <Link to={`/posts/${year}/${month}/${day}/${slug}`}>({comments.length})</Link></Info>
      <Info>Published {publishFormated} by <Link style={{textDecoration: "underline"}} to={"/users/" + author.username}>{author.username}</Link></Info>
      <Text>{body}</Text>
      <Link to={`${props.shareLink}`}><Share>Share this post</Share></Link>
    </Container>
  )
}

const Tags = styled.div`
  display: flex;
`

const Container = styled.div`
  background-color: #F8F8F8;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const Title = styled.div`
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
  margin-top: 10px;
  font-size: 12px;
  font-style: italic;
  color: #7C7C7C;
  a {
    text-decoration: underline;
  :hover {
    text-decoration: none;
  }
  }
`
const Text = styled.div`
  color: #170A1C;
  margin-top: 10px;
  font-size: 16px;
  line-height: 24px;
`
const Share = styled.p`
  font-size: 1rem;
  color: #0B7189;
  /* text-decoration: underline; */
  margin-top: 10px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export default Post