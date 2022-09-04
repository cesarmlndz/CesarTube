import React from 'react'

export default function NextVideos(props) {
  return (
    <div>
        <div className='next-video-container'>
            <img src={props.vid.image}/>
            <div className='next-video-info-container'>
                <h4 className='next-video-title'>{props.vid.title}</h4>
                <h4 className='next-video-channel'>{props.vid.channel}</h4>
            </div>
        </div>
    </div>
  )
}