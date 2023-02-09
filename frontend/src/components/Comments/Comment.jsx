import React from 'react'
import styled from 'styled-components'
import moment from "moment"

function Comment(props) {
  const comment = props.comment
  const index = props.index

  const createdFormated = moment(comment.created).format('MMM Do YYYY, h:mm a')

  return (
    <Container index={index}>
      <Info index={index}>Comment by {comment.name} {createdFormated}</Info>
      <Body index={index}>{comment.body}</Body>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.index % 2 === 0 ? "#F8F8F8" : "#7D7D7D"};
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const Info = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${props => props.index % 2 === 0 ? "#7C7C7C" : "#E2E2E2"};
`
const Body = styled.div`
  padding-top: 5px;
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.index % 2 === 0 ? "#170A1C" : "#FFFFFF"};
`

export default Comment