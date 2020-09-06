const router = require("express").Router();
const Post = require("../models/posts");

router.get("/", async (req, res) => {
  try {
    res.send("Get Posts ");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await new Post({
      caption: req.body.caption,
    });
    if (newPost) {
      res.json(newPost);
      //saves this post info to our db
      newPost.save();
    } else {
      res.status(404).json({ message: "Could not send new post" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
