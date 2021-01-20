const express = require("express");
const router = express.Router();

const {
  favorite,
  addfavorite,
  deletefavorite,
  signup,
  login,
  callbackgit,
  logout,
  category,
} = require("../controllers");

// * GET /category
router.get("/category/:name", category.get);

// * POST /deletefavorite
router.post("/deletefavorite", deletefavorite.post);

// * POST /addfavorite
router.post("/addfavorite", addfavorite.post);

// * GET /favorite
router.get("/favorite", favorite.get);

// // * POST /signup
router.post("/signup", signup.post);

// // * POST /login
router.post("/login", login.post);

// // * POST /logout
router.post("/logout", logout.post);

// // * POST /callback Authorization
// router.post("/callback", callback.post);

// * POST /callback Authorization
router.post("/callbackgit", callbackgit.post);

module.exports = router;
