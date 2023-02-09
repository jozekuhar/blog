import React from 'react'
import Comment from "./Comment"

function CommentsList(props) {
  const comments = props.post.comments

  const commentsList = comments.map((comment, i) => {
    return (
      <Comment key={comment.id} comment={comment} index={i} />
      )
    })

  return (
    <div>
      {commentsList}
    </div>
  )
}

export default CommentsList