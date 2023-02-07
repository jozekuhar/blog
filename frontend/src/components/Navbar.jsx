import styled from "styled-components"
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <Container>
      <NavLink to="/" style={({ isActive}) => isActive ? {textDecoration: "underline"} : undefined}>Home</NavLink>
      <NavLink to="/posts" style={({ isActive}) => isActive ? {textDecoration: "underline"} : undefined}>Posts</NavLink>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #0B7189;
  a {
    padding: 10px;
    text-decoration: none;
    color: white;
  }
`

export default Navbar