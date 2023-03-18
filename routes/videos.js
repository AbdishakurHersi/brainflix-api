const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
router.get("/videos", (request, response) => {
  const videosFile = fs.readFileSync("./data/video-details.json");
  const videosArray = JSON.parse(videosFile);
  response.json(videosArray);
});

router.get("/videos/:id", (req, res) => {
  // console.log(req.params);
  const videosFile = fs.readFileSync("./data/video-details.json");
  const videosArray = JSON.parse(videosFile);
  const videoWithID = videosArray.find((video) => {
    return video.id === req.params.id;
  });
  if (!videoWithID) {
    res.status(404);
    res.json([]);
    return;
  }
  res.json([videoWithID]);
});

router.post("/upload", (req, res) => {
  const newtitle = req.body.up;
  const newchannel = req.body.down;
  const newShoeImage = "http://localhost:8000/Upload-video-preview.jpg";
  const newShoeId = uniqid();
  const videosFile = fs.readFileSync("./data/video-details.json");
  const videosArray = JSON.parse(videosFile);

  videosArray.push({
    id: newShoeId,
    title: newtitle,
    channel: newchannel,
    image: newShoeImage,
    likes: 0,
    timestamp: 1632496261000,
  });

  fs.writeFileSync("./data/video-details.json", JSON.stringify(videosArray));
  // res.json(videosArray);
});

module.exports = router;
