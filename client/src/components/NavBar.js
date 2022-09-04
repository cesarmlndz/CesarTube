import React, { useEffect } from 'react'
import { useState } from 'react';
import upload from '../Icons/upload.svg';
import triangle from '../Icons/white-play.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavBar() {

  const [search, setSearch] = useState("");
  const [allVideos, setAllVideos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/videos/allVideos`)
    .then((res) => {
      setAllVideos(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <nav className='nav-bar'>
      <div className='logo-bundle' onClick={() => navigate('/')}>
        <div className='logo'>
          <img src={triangle} />
        </div>
        <h3>CesarTube</h3>
      </div>
       <div className='search-container'>
          <input placeholder='Search' className='search' onChange={(e) => {
              setSearch(e.target.value);
            }}></input>
          {search.length !== 0 && <div className='filter-container'>
           {
              allVideos.filter((vid) => vid.title.toLowerCase().includes(search.toLocaleLowerCase()))
              .map((vid) => <div className='filtered-word' onClick={() => navigate(`/${vid.id}`)}>{vid.title}</div>)
           }
          </div>}  
       </div>
        <button className='upload-button' onClick={() => navigate('/upload')}>
          <img src={upload} className="upload-arrow"></img>
          <h1 className='upload-word'>UPLOAD</h1>
        </button>
        <div className='nav-avatar'></div>
    </nav>
  )
}
