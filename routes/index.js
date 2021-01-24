const express = require("express");
const router = express.Router();

const {
  favorites,
  addfavorite,
  deletefavorite,
  signup,
  login,
  callbackgit,
  logout,
  category,
  editprofile,
  callbackgoogle,
  userinfo
} = require("../controllers");

// * GET /category
router.get("/category/:name", category.get);

// * GET /category
router.get("/userinfo", userinfo.get);

// * POST /deletefavorite
router.post("/deletefavorite", deletefavorite.post);

// * POST /addfavorite
router.post("/addfavorite", addfavorite.post);

// * GET /favorite
router.get("/favorites", favorites.get);

// // * POST /signup
router.post("/signup", signup.post);

// // * POST /login
router.post("/login", login.post);

// // * POST /logout
router.post("/logout", logout.post);

// * POST /callback Authorization
router.post("/callbackgoogle", callbackgoogle.post);

// * POST /callback Authorization
router.post("/callbackgit", callbackgit.post);

// * POST /editprofile
router.post("/editprofile", editprofile.post);

// * POST /sociallogin
router.post('/sociallogin', sociallogin.post)

module.exports = router;
