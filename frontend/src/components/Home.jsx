import styled from "styled-components"

function Home() {
  return (
    <Container>
      <Title>This is myBlog</Title>
    </Container>
  )
}

const Container = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
`
const Title = styled.div`
  color: black;
  font-size: 30px;
`

export default Home