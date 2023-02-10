import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

function Tag(props) {
  const tag = props.tag
  console.log(props.tag)

  return (
    <Container>
      <Link to={`/tags/${tag.slug}`}>{tag.name.toUpperCase()}</Link>
    </Container>
  )
}

const Container = styled.div`
  background-color: #228CDB;
  margin-right: 10px;
  color: white;
  font-weight: 500;
  padding: 2px 10px 2px 10px;
  border-radius: 5px;
  font-size: 12px;
  :hover {
    background-color: #170A1C;
    cursor: pointer;
  }
`

export default Tag