import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mp4 from '../Icons/video.mp4';
import gocart from '../Icons/gocart.png';
const { v4 : uuidv4 } = require('uuid');

export default function UploadVideo() {

    const navigate = useNavigate();

    const correctId = uuidv4();

    const { videoId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const uploadVideo = () => {

       if( title.length < 1 || description.length < 1) {
           alert("Please fill out all fields!");
       } else {
            const video4details = {
                title: title,
                channel: "Cesar Melendez",
                image: gocart,
                description: description,
                views: "1",
                likes: "0",
                duration: "10:32",
                video: mp4,
                timestamp: `${(new Date().getMonth())}/${new Date().getDate()}/${new Date().getFullYear()}`,
                comments: [],
                id: correctId
            }

            const video4video = {
                id: correctId,
                title: title,
                channel: "Cesar Melendez",
                image: gocart
            }

            axios.post(`http://localhost:3001/videos/upload/${videoId}`, { 
                video4details: video4details,
                video4video: video4video
            })
            .then((response) => {
            console.log(response);
            }).catch((err) => {
            console.log(err)
            })

            navigate(`/${correctId}`);

        }
    }

    return (
        <div className='upload-page'>
            <div className='upload-container'>
                <img src={gocart} className='thumbnail'/>
                <div>
                <div className='upload-inputs'>
                    <h1>Share your own video!</h1>
                    <input type='text' placeholder='Title...' onChange={(e) => {
                        setTitle(e.target.value);
                    }}></input>
                    <input type='text' placeholder='Description...' onChange={(e) => {
                        setDescription(e.target.value);
                    }}></input>
                    <button onClick={uploadVideo}>UPLOAD</button>
                </div>
                </div>
            </div>
        </div>
  )
}
