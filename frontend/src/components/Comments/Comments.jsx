import React from 'react'
import styled from 'styled-components'
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"

function Comments(props) {
  const post = props.post

  return (
    <Container>
      <Title>{post.comments.length} comments</Title>
      <CommentsList post={post} />
      <CommentForm post={post} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
const Title = styled.div`
  margin: 20px;
  text-align: center;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
`

export default Comments