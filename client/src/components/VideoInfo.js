import React, { useEffect, useState, useRef } from 'react';
import views from '../Icons/views.svg';
import likesIcon from '../Icons/likes.svg';
import axios from 'axios';

export default function VideoInfo(props) {

  const [like, setLike] = useState(props.vid.likes);

  useEffect(() => {
    setLike(props.vid.likes);
  }, [props.vid.title]);

  const likeVideo = () => {
    const likeInt = parseInt(props.vid.likes.replace(/\D/g,'')) + 1;
    const likeString = likeInt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    setLike(likeString);

    axios.put(`http://localhost:3001/videos/likes/${props.videoId}`, {
      updatedLike: likeString
    })
    .then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <div className='video-info-container'>
        <h2 className='video-title'>{props.vid.title}</h2>
        <div className='video-info-description-container'>
          <h5 className='video-channel'>By {props.vid.channel}</h5>
          <h5 className='video-date'>{`${new Date(props.vid.timestamp).getMonth()}/${new Date(props.vid.timestamp).getDate()}/${new Date(props.vid.timestamp).getFullYear()}`}</h5>
          <img className='video-views-icon' src={views}/>
          <h5 className='video-views-value'>{props.vid.views}</h5>
          <img className='video-views-icon' onClick={likeVideo} src={likesIcon}/>
          <h5 className='video-likes-value'>{like}</h5>
        </div>
        <p className='video-description'>{props.vid.description}</p>
    </div>
  )
}
