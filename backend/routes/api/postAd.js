const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/PostAd");

const router = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

//posting an ad
router.post(
  "/",
  upload,
  [auth, [check("title", "title is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        image: req.file.filename,
        user: req.user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//getting all posts
router.get("/", auth, async (req, res) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 10;

    const page = req.query.page ? parseInt(req.query.page) : 1;

    const totalPosts = await Post.count();

    totalPosts % pagination == 0
      ? (pages = totalPosts / pagination)
      : (pages = totalPosts / pagination + 1);

    const posts = await Post.find()
      .skip((page - 1) * pagination)
      .limit(pagination)
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get total pages
router.get("/pageCount", async (req, res) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 12;

    const totalPosts = await Post.count();

    totalPosts % pagination == 0
      ? (pages = totalPosts / pagination)
      : (pages = totalPosts / pagination + 1);

    res.json(parseInt(pages));
  } catch (err) {
    res.status(500).send("server error");
  }
});

//getting post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "post not found" });

    post.requestor = req.user.id;

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//delete post by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    if (req.user.id !== post.user.toString())
      return res.status(401).json({ msg: "unauthorized access" });

    await post.remove();
    res.json("deleted successfully");
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
