/**
 * @swagger
 * tags:
 *   name: Follow Users
 *   description: User endpoints
 */

/**
 * @swagger
 * /api/auth/follow/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *      - Follow Users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users.
 *       '404':
 *         description: Users not found.
 */


/**
 * @swagger
 * /api/auth/follow/follower-setup:
 *   post:
 *     summary: Follow users
 *     description: This endpoint allows a user to follow other users by providing their user IDs.
 *     tags: 
 *       - Follow Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs to follow
 *             example:
 *               userIds: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
 *     responses:
 *       200:
 *         description: Users followed successfully
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
 *                   example: Users followed successfully
 *                 followedUsers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
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
 *                   example: Unauthorized - Token is required
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
