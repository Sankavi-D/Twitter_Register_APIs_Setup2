
/**
 * @swagger
 * /api/auth/subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     description: This endpoint allows a user to create a new subcategory.
 *     tags:
 *       - Subcategory
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subcategoryName:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Names of the subcategories
 *                 example: ["cricket", "hockey"]
 *               categoryId:
 *                 type: string
 *                 description: The ID of the parent category
 *                 example: "60d0fe4f5311236168a109cd"
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Subcategory created successfully
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ce"
 *                     subcategoryName:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["cricket", "hockey"]
 *                     categoryId:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109cd"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /api/auth/subcategory:
 *   get:
 *     summary: Get all subcategories
 *     description: This endpoint allows a user to get all subcategories.
 *     tags:
 *       - Subcategory
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ce"
 *                   subcategoryName:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["cricket", "hockey"]
 *                   categoryId:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109cd"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /api/auth/subcategory/{categoryId}:
 *   get:
 *     summary: Get subcategories by category ID
 *     description: This endpoint allows a user to get subcategories by category ID.
 *     tags:
 *       - Subcategory
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the parent category
 *         example: "60d0fe4f5311236168a109cd"
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ce"
 *                   subcategoryName:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["cricket", "hockey"]
 *                   categoryId:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109cd"
 *       404:
 *         description: Subcategories not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Subcategories not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /api/auth/subcategory/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     description: This endpoint allows a user to update a subcategory by ID.
 *     tags:
 *       - Subcategory
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subcategory to update
 *         example: "60d0fe4f5311236168a109ce"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subcategoryName:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Names of the subcategories
 *                 example: ["cricket", "hockey"]
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Subcategory updated successfully
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ce"
 *                     subcategoryName:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["cricket", "hockey"]
 *                     categoryId:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109cd"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Subcategory not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /api/auth/subcategory/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     description: This endpoint allows a user to delete a subcategory by ID.
 *     tags:
 *       - Subcategory
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subcategory to delete
 *         example: "60d0fe4f5311236168a109ce"
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Subcategory deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Subcategory not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
