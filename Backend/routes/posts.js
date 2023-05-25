const express = require("express");
const {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
  getPostByTitle,
  updatePostById,
  getPostById,
} = require("../controllers/post.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

/**
 * Routes : localhost:4000/api/posts/
 * Method : GET
 * Description: Getting All Posts .
 * Access: Public
 * Parameters: none
 */
// router.get("/", isAuthenticatedUser, authorizeRoles("admin"), getAllPosts);
router.get("/", getAllPosts);

/**
 * Routes : http://localhost:3000/api/posts/:title
 * Method : GET
 * Description: Getting Posts by title.
 * Access: Public
 * Parameters: title
 */
router.get("/title/:title", getPostByTitle);
/**
 * Routes : localhost:3000/api/posts/:id
 * Method : GET
 * Description: Getting Posts by id.
 * Access: Public
 * Parameters: id
 */
router.get("/id/:id", getPostById);

/**
 * Routes : localhost:3000/api/posts/addnewpost
 * Method : POST
 * Description: creating new Posts .
 * Access: Public
 * Parameters: none
 */
router.post(
  "/addnewpost",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createNewPost
);

/**
 * Routes : localhost:3000/api/posts/updatepost/title/:title
 * Method : PUT
 * Description: updating post by title  .
 * Access: Public
 * Parameters: title
 */
router.put("/updatepost/title/:title", isAuthenticatedUser, updatePost);

/**
 * Routes : localhost:3000/api/posts/updatepost/id/:_id
 * Method : PUT
 * Description: updating post by ID  .
 * Access: Public
 * Parameters: title
 */
router.put("/updatepost/id/:id", updatePostById);

/**
 * Routes : localhost:3000/api/posts/deletepost/:title
 * Method : DELETE
 * Description: Deleting post by Title .
 * Access: Public
 * Parameters: title
 */
router.delete("/deletepost/:title", isAuthenticatedUser, deletePost);

module.exports = router;
