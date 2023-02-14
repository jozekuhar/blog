import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import axios from 'axios'
import moment from "moment"

function PostSimilar(props) {
  const post = props.post
  const [similarPosts, setSimilarPosts] = useState([])

  useEffect(() => {
    async function similarPost() {
      try {
        const response = await axios.get(`/api/blog/posts/${post.id}/similar/`)
        setSimilarPosts(response.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    similarPost()
  }, [post])

  const listSimilarPosts = similarPosts.map(post => {
    const year = moment(post.publish).format("YYYY")
    const month = moment(post.publish).format("MM")
    const day = moment(post.publish).format("DD")
    return (
      <PostLink key={post.id}><Link to={`/posts/${year}/${month}/${day}/${post.slug}`}>{post.title}</Link></PostLink>
    )
  })

  return (
    <SimilarPosts>
      {similarPosts.length > 0 ? <Title>Similar Posts</Title> : <></>}
      {listSimilarPosts}
    </SimilarPosts>
  )
}

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

const SimilarPosts = styled.div`
  margin: 20px;
  padding: 20px;
`
const PostLink = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #0B7189;
  text-decoration: underline;
  :hover {
    text-decoration: none;
  }
`

export default PostSimilar