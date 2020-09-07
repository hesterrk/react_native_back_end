const router = require("express").Router();
const Post = require("../models/posts");

router.get("/", async (req, res, next) => {
  try {
    //find() method on mongoose
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  //Creating an instance of the posts model
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

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Could not find the post" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.remove({ _id: id });

    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update the caption
//patch just updates what has changed, it doesnt replace the whole resource including whats changed (thats what PUT does)
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // first is what post we are changing, second is what about the post we are changing alongside the new value
    const changeCaption = await Post.updateOne(
      { _id: id },
      { $set: { caption: req.body.caption } }
    );

    res.json(changeCaption);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
