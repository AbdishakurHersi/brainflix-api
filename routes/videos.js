const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
// "https://project-2-api.herokuapp.com/videos/?api_key=9a394b9c-6c4f-4413-bd66-603a19fcc11a"
router.get("/videos", (request, response) => {
  const videosFile = fs.readFileSync("./data/video-details.json");
  const videosArray = JSON.parse(videosFile);
  response.json(videosArray);
});

router.get("/videos/:id", (req, res) => {
  console.log(req.params);
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

// router.post("/upload", function (req, res) {
//   console.log(req.body);
//   const newShoeBrand = req.body.brand;
//   const newShoeModel = req.body.model;
//   const newShoeColor = req.body.color;
//   const newShoeImage = "http://localhost:8000/defaultshoe.jpeg";
//   const newShoeId = uniqid();

//   const videosFile = fs.readFileSync("./data/video-details.json");
//   const videosArray = JSON.parse(videosFile);
//   videosArray.push({
//     id: newShoeId,
//     brand: newShoeBrand,
//     model: newShoeModel,
//     color: newShoeColor,
//     image: newShoeImage,
//   });

//     fs.writeFileSync("./data/video-details.json", JSON.stringify(videosArray));
//   console.log(videosArray);
//     res.json(videosArray);

// });

router.post("/upload", function (req, res) {
  console.log(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const newShoeImage = "http://localhost:8000/defaultshoe.jpeg";
  const newShoeId = uniqid();

  const videosFile = fs.readFileSync("./data/video-details.json");
  const videosArray = JSON.parse(videosFile);
  videosArray.push({
    id: newShoeId,
    title: title,
    description: description,
    image: newShoeImage,
  });

  fs.writeFileSync("./data/video-details.json", JSON.stringify(videosArray));
  console.log(videosArray);
  res.json(videosArray);
});

module.exports = router;
