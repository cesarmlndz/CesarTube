import axios from 'axios';
import React, { useEffect, useState } from 'react'
import commentIcon from '../Icons/add_comment.svg';
import trash from '../Icons/trash.png';
import { v4 as uuid } from 'uuid';

export default function Comments(props) {
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  /* Everytime the videoId (url parameter) changes, we receive data from the backend and save it to 'comments' */
  useEffect(() => {
    axios.get(`http://localhost:3001/videos/comments/${props.videoId}`)
    .then((res) => {
      setComments(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [props.videoId]);

  /* Posting new comment
    1. Create a comment object (using blueprint from comment object from video-details.json)
    2. Comments from video-details.json are already inside of 'comments', so we setComments again but we spread all the 
       comments, plus the new comment object we just created 
    3. This post request's body is an object that contains the new comment we created in (1) 
  */
  const postNewComment = () => {
   if(newComment.length < 1) {
     alert("Please fill out a comment!");
   } else {
      const comment = {
        id: uuid(),
        name: "Cesar Melendez",
        signedIn: true,
        comment: newComment,
        likes: 0,
        timestamp: `${(new Date().getMonth())}/${new Date().getDate()}/${new Date().getFullYear()}`
      }

      setComments([...comments, comment]);

      axios.post(`http://localhost:3001/videos/comments/${props.videoId}`, { 
        comment: comment 
      })
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err)
      })
   }
  };

  const deleteComment = (id) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    const commentToDelete = comments.find((comment) => comment.id === id);
    setComments(newComments);
    axios.delete(`http://localhost:3001/videos/comments/${props.videoId}`, {
      comment: commentToDelete
    })
    .then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  };

  /* UI */
  return (
    <div>
      <div className='adding-comment-container'>
      <label>JOIN THE CONVERSATION</label>
      <div className='comment-text-container'>
        <div className='nav-avatar comment-img'></div>
          <input type='text' placeholder='Add a new comment' onChange={(e) => {
            setNewComment(e.target.value);
          }}></input>
          <button className='upload-button comment-button' onClick={postNewComment}>
            <img src={commentIcon} alt=''/>
            <h3>COMMENT</h3>
          </button>
      </div>
    </div>
    <h3>{comments.length} comments</h3>
    {comments.map((comment, index) => (
        <div className='displayed-comment-container'>
          <div className= {comment.signedIn ? 'nav-avatar comment-img' : 'nav-avatar comment-profile-img'}></div>
          <div className='comment-info'>
            <h3 className='comment-author'>{comment.name}</h3>
            <h3 className='comment-content'>{comment.comment}</h3>
          </div>
          <h3 className='comment-date'>{`${new Date(comment.timestamp).getMonth() + 1}/${new Date(comment.timestamp).getDate()}/${new Date(comment.timestamp).getFullYear()}`}</h3>
         {comment.signedIn && <img src={trash} className='trash' onClick={() => deleteComment(comment.id)}/>}
        </div>
    ))}
    </div>
  )
}
