import { Link } from "react-router-dom"
import styled from "styled-components"

function NotFound() {
  return (
    <Container>
      <Title>Stran ni na voljo.</Title>
      <Text>Žal stran, ki ste jo želeli obiskati ni na voljo. Pojdite nazaj na  <Link to="/">prvotno stran.</Link></Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.p`
  padding: 20px;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
`
const Text = styled.p`
  a {
    color: #0B7189;
    text-decoration: underline;
  }
`

export default NotFound