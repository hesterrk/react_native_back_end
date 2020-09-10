const router = require("express").Router();
const User = require("../models/auth");

router.get("/", async (req, res, next) => {
  try {
    //find() method on mongoose
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  //Creating an instance of the user model
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  try {
    //saves this post info to our db
    const savedUser = await newUser.save();
    if (savedUser) {
      res.json(savedUser);
    } else {
      res.status(404).json({ message: "Could not add new user" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Could not find the user" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.remove({ _id: id });

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update the first_name and last_name
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const changeName = await User.updateOne(
      { _id: id },
      {
        $set: { first_name: req.body.first_name },
        $set: { last_name: req.body.last_name },
      }
    );

    res.json(changeName);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
