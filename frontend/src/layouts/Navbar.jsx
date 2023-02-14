import styled from "styled-components"
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <Container>
      <Center>
        <NavLink to="/" style={({ isActive}) => isActive ? {textDecoration: "underline"} : undefined}>Home</NavLink>
        <NavLink to="/posts" style={({ isActive}) => isActive ? {textDecoration: "underline"} : undefined}>Posts</NavLink>
      </Center>
      <Right>
        <input placeholder="Search"/>
      </Right>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  inset: 0 0 0 0;
  height: 50px;
  background-color: #0B7189;
  a {
    padding: 10px;
    text-decoration: none;
    color: white;
  }
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Right = styled.div`
  display: flex;
  justify-self: end;
  align-items: center;
  input {
    height: 60%;
    border: none;
    padding-left: 15px;
    border-radius: 10px;
  }
`

export default Navbar