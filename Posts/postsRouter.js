const router = require("express").Router();
const Post = require("../models/posts");

router.get("/", async (req, res) => {
  try {
    //find() method on mongoose
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  const newPost = new Post({
    caption: req.body.caption,
  });
  try {
    //saves this post info to our db
    const savedPost = await newPost.save();
    if (savedPost) {
      res.json(savedPost);
    } else {
      res.status(404).json({ message: "Could not send new post" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
