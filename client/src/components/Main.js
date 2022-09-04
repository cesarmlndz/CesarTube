import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mp4 from '../Icons/video.mp4';
import VideoInfo from './VideoInfo';
import NextVideos from './NextVideos';
import Comments from './Comments';
import NavBar from './NavBar';
import axios from 'axios';

export default function Main() {
  const { videoId } = useParams();
  const videoTag = useRef();

  const [currentVid, setCurrentVid] = useState();
  const [nextVids, setNextVids] = useState([]);


/* Everytime the videoId (url parameter) changes, we receive data from the backend and save into 'currentVid' and 'nextVids' */
  useEffect(() => {
    axios.get(`http://localhost:3001/videos/${videoId}`)
    .then((response) => {
      setCurrentVid(response.data.currentVideo);
      setNextVids(response.data.nextVideos);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [videoId]);

  /* UI */
  return (
    <div>
      <NavBar />
      <div className='video'>
        {currentVid && <video ref={videoTag} src={mp4} width='100%' height='100%' controls poster={currentVid.image}/>}
      </div>
      <div className='bottom-half'>
        <div className='left-side'>
          {currentVid && <VideoInfo videoId = {videoId} vid={currentVid} videoTag={videoTag}/>}
          {currentVid && <Comments videoId={videoId}/>}
        </div>
        <div className='right-side'>
          <h3>NEXT VIDEOS</h3>
          {
            nextVids.map((nextVid, index) => (
              <Link key={index} style={{textDecoration: 'none'}} to={`/${nextVid.id}`} onClick={() => {
                videoTag.current.load();
              }}>
                <NextVideos vid={nextVid}/>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}