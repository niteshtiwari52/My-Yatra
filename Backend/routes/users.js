const express = require("express");
const {
  registerUsesr,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getAllUser,
  updateProfile,
  updateUserRole,
  deleteUser,
} = require("../controllers/user.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

/**
 * Routes : localhost:4000/api/users/register
 * Method : POST
 * Description: user signup
 * Access: Public
 * Parameters: none
 */
router.post("/register", registerUsesr);

/**
 * Routes : localhost:4000/api/users/login
 * Method : POST
 * Description: user Login
 * Access: Public
 * Parameters: none
 */
router.post("/login", loginUser);

/**
 * Routes : localhost:4000/api/users/forgotpassword
 * Method : POST
 * Description: frogot password
 * Access: Public
 * Parameters: none
 */
router.post("/forgot/password/reset", forgotPassword);

/**
 * Routes : localhost:4000/api/users/:token
 * Method : PUT
 * Description: resetting password
 * Access: Public
 * Parameters: token
 */
router.put("/password/reset/:token", resetPassword);

/**
 * Routes : localhost:4000/api/users/logout
 * Method : GET
 * Description: Logut
 * Access: Public
 * Parameters: none
 */
router.get("/logout", logout);

/**
 * Routes : localhost:4000/api/users/me/view/details
 * Method : GET
 * Description: view my profile
 * Access: Public
 * Parameters: none
 */
router.get("/me/view/details", isAuthenticatedUser, getUserDetails);

/**
 * Routes : localhost:4000/api/users/me/change/password
 * Method : PUT
 * Description: change password
 * Access: Public
 * Parameters: none
 */
router.put("/me/change/password", isAuthenticatedUser, updatePassword);

/**
 * Routes : localhost:4000/api/users/me/update/profile
 * Method : PUT
 * Description: update my profile
 * Access: Public
 * Parameters: none
 */
router.put("/me/update", isAuthenticatedUser, updateProfile);

/**
 * Routes : localhost:4000/api/users/admin/getalluser
 * Role : admin
 * Method : GET
 * Description: see al users by admin
 * Access: admin
 * Parameters: none
 */
router.get(
  "/admin/getalluser",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);

/**
 * Routes : localhost:4000/api/users/admin/getuserbyid/:id
 * Role : admin
 * Method : GET
 * Description: show details of a particular user by Id
 * Access: admin
 * Parameters: Id
 */
router.get(
  "/admin/getuserbyid/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUserDetails
);

/**
 * Routes : localhost:4000/api/users/admin/updaterole/:id
 * Role : admin
 * Method : PUT
 * Description: upadate role  of a particular user by Id
 * Access: admin
 * Parameters: ID
 */
router.put(
  "/admin/updaterole/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);

/**
 * Routes : localhost:4000/api/users/admin/deleteuser/:id
 * Role : admin
 * Method : DELETE
 * Description: delete a particular user by Id
 * Access: admin
 * Parameters: id
 */
router.delete(
  "/admin/deleteuser/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);
module.exports = router;
