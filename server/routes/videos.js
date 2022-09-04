const express = require('express');
const router = express.Router();
const fs = require('fs');

let videos = [];
let videoDetails = [];

/* Reading from videos.json and video-details.json to store it into 'videos' array and 'videoDetails' array */
const getData = () => {
    fs.readFile("./data/videos.json", (err, data) => {
        if(err) {
            console.log(err);
        } else {
            videos = JSON.parse(data);
        }
    });

    fs.readFile("./data/video-details.json", (err, data) => {
        if(err) {
            console.log(err);
        } else {
            videoDetails = JSON.parse(data);
        }
    });
};

/* Calling function */
getData();

router.get('/allVideos', (req, res) => {
    res.json(videos);
})

/* Get request filters and finds videos based on id and saves it in object called response. We then send that object to the 
frontend */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const currentVideo = videoDetails.find((vid) => vid.id === id);
    const nextVideos = videos.filter((vid) => vid.id !== id);

    const response = {
        currentVideo: currentVideo,
        nextVideos: nextVideos
    }

    res.json(response);
});

/* Get request finds video based on id and saves it's comments to a 'comments' variable. We then send that variable to the 
frontend */
router.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const currentVideo = videoDetails.find((vid) => vid.id === id);
    const comments = currentVideo.comments;
    res.json(comments);
})

/* Post request finds video based on id - Specific steps below */
router.post('/comments/:id', (req, res) => {
    const id = req.params.id;
    const currentVideo = videoDetails.find((vid) => vid.id === id);

    // Create new comments array with current video comments and new comment
    const newComments = [...currentVideo.comments, req.body.comment];

    // Update current video details
    const updatedVideo = {
        ...currentVideo,
        comments: newComments
    };

    // Get other videos 
    const otherVideos = videoDetails.filter((vid) => vid.id !== id);

    // Update video details array
    let newVideoDetails = [...otherVideos, updatedVideo];
    videoDetails = newVideoDetails;

    fs.writeFile("./data/video-details.json", JSON.stringify(newVideoDetails), (err) => {
        if(err) {
            console.log(err);
        }
    })
});

router.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const currentVideo = videoDetails.find((vid) => vid.id === id);

    const commentToDelete = req.body;

    const newComments = currentVideo.comments.filter((comment) => comment.id === commentToDelete.id);

    const updatedVideo = {
        ...currentVideo,
        comments: newComments
    }

    const otherVideos = videoDetails.filter((vid) => vid.id !== id);

    let newVideoDetails = [...otherVideos, updatedVideo];
    videoDetails = newVideoDetails;
    
    fs.writeFile('./data/video-details.json', JSON.stringify(newVideoDetails), (err) => {
        if(err) {
            console.log(err);
        }
    });
})

router.post('/upload/:id', (req, res) => {
    const v1 = req.body.video4details;
    const v2 = req.body.video4video
    videoDetails.push(v1);
    videos.push(v2);
    fs.writeFile('./data/video-details.json', JSON.stringify(videoDetails), (err) => {
        if(err) {
            console.log(err);
        }
    });
    fs.writeFile('./data/videos.json', JSON.stringify(videos), (err) => {
        if(err) {
            console.log(err);
        }
    });
})

router.put('/likes/:id', (req, res) => {
    const id = req.params.id;
    const currentVideo = videoDetails.find((vid) => vid.id === id);

    const { updatedLike } = req.body;

    const updatedVideo = {
        ...currentVideo,
        likes: updatedLike
    }

    const otherVideos = videoDetails.filter((vid) => vid.id !== id);

    let newVideoDetails = [...otherVideos, updatedVideo];
    videoDetails = newVideoDetails;

    fs.writeFile('./data/video-details.json', JSON.stringify(newVideoDetails), (err) => {
        if(err) {
            console.log(err);
        }
    });
})

module.exports = router;

