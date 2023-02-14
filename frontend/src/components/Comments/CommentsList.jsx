import React, { useState } from 'react'
import styled from 'styled-components'
import Comment from "./Comment"

function CommentsList(props) {
  const comments = props.post.comments
  const [commentNumnber, setCommentNumber] = useState(2)

  console.log(comments.length)

  const commentsList = comments.map((comment, i) => {
    return (
      <Comment key={comment.id} comment={comment} index={i} />
      )
    })

  return (
    <Container>
      {commentsList.slice(0, commentNumnber)}
      {commentNumnber > 2 ? <Button onClick={() => setCommentNumber(prev => prev - 2)}>Show less comments</Button> : <></>}
      {commentNumnber < comments.length - 2 ? <Button onClick={() => setCommentNumber(prev => prev + 2)}>Show more comments</Button> : <></>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #0B7189;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export default CommentsList