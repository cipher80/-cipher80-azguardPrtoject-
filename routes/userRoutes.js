const express = require("express");
const router = express.Router();
// const authenticateJWT = require("../middleware/authMiddleware");

const {
  registerUser,
  verifyUser,
  loginUser,
} = require("../controllers/userController");
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a  users
 *     description: Register a  users .
 *     responses:
 *       200:
 *         description: Register users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: userRegister 
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /user/verify:
 *   post:
 *     summary: verify a  users
 *     description: verify a  users .
 *     responses:
 *       200:
 *         description: verify users can  change the status of users from active to  inactive and vice versa .
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: verifyUser 
 */
router.post("/verify", verifyUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login  users
 *     description: login   users .
 *     responses:
 *       200:
 *         description: login users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Log In user 
 */
router.post("/login", loginUser);

module.exports = router;