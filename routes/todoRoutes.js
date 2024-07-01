const express = require("express");
const router = express.Router();

const {
  authenticateJWT,
  roleAuthorization,
} = require("../middleware/authMiddleware.js");
const {
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
  getTodoItemById,
  getAllTodoItems,
  filterTodoItemsByStatus,
  uploadTodoItems,
  downloadTodoList,
} = require("../controllers/todoController");
/**
 * @swagger
 * /todo/create:
 *   post:
 *     summary: Creates todo tasks.
 *     description: Creates todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: Creates todo tasks on the existing user or logged in users.
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
 *                     example: createTodo
 */
router.post("/create", authenticateJWT, createTodoItem);

/**
 * @swagger
 * /todo/update:
 *   put:
 *     summary: update todo tasks.
 *     description: update todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: update todo tasks on the existing user or logged in users.
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
 *                     example: update Todo
 */
router.put("/update/:id", authenticateJWT, updateTodoItem);

/**
 * @swagger
 * /todo/delete/:id:
 *   delete:
 *     summary: delete todo tasks.
 *     description: delete todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: delete todo tasks on the existing user or logged in users.
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
 *                     example: delete todo by id 
 */
router.delete("/delete/:id", authenticateJWT, deleteTodoItem);

/**
 * @swagger
 * /todo/showbyid:
 *   get:
 *     summary: Get Todo By id todo  .
 *     description: Get Todo By id todo  on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: Get Todo By id todo  on the existing user or logged in users.
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
 *                     example: get todos by id
 */
router.get("/showbyid/:id", authenticateJWT, getTodoItemById);

/**
 * @swagger
 * /todo/showAll:
 *   getAll:
 *     summary: showAll todo tasks.
 *     description: showAll todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: showAll todo tasks on the existing user or logged in users.
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
 *                     example: showAll
 */
router.get("/showAll", authenticateJWT, getAllTodoItems);

/**
 * @swagger
 * /todo/filter:
 *   post:
 *     summary: filter todo tasks.
 *     description: filter todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: filter todo tasks on the existing user or logged in users.
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
 *                     example: filter
 */
router.get("/filter", authenticateJWT, filterTodoItemsByStatus);

/**
 * @swagger
 * /todo/upload:
 *   post:
 *     summary: Creates todo tasks.
 *     description: upload todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: upload todo tasks on the existing user or logged in users.
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
 *                     example: upload
 */
router.post("/upload", authenticateJWT, uploadTodoItems);

/**
 * @swagger
 * /todo/download:
 *   get:
 *     summary: download todo tasks.
 *     description: download todo tasks on the existing user or logged in users .
 *     responses:
 *       200:
 *         description: download todo tasks on the existing user or logged in users.
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
 *                     example: download
 */
router.get("/download", authenticateJWT, roleAuthorization(["Admin"]), downloadTodoList);

module.exports = router;