/**
 * @swagger
 * tags:
 *   name: User Registration
 *   description: User registration operations
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registration successful
 *       '400':
 *         description: Invalid request body or email already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Verify user's email
 *     tags: [User Registration]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         description: Verification token received in email
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *       '401':
 *         description: Invalid or expired token
 */

/**
 * @swagger
 * /api/auth/password-setup:
 *   post:
 *     summary: Setup user password
 *     tags: [User Registration]
 *     description: Endpoint to setup user password after registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Password setup successful.
 *       '500':
 *         description: Error setting up password.
 *     security:
 *       - JWTAuth: []
 */


/**
 * @swagger
 * /api/auth/image-setup:
 *   post:
 *     summary: Upload and set up images for a user
 *     description: This endpoint allows users to upload and set up multiple images.
 *     tags: 
 *       - Image
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files to upload
 *               type:
 *                 type: string
 *                 enum: [profile, post]
 *                 description: Type of the image (profile or post)
 *     responses:
 *       200:
 *         description: Images uploaded and set up successfully
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
 *                   example: Images uploaded and set up successfully
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


/**
 * @swagger
 * /api/auth/video-setup:
 *   post:
 *     summary: Upload a video
 *     description: Uploads a video file for a user.
 *     tags:
 *       - Videos
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the video.
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file to upload.
 *             required:
 *               - title
 *               - video
 *     responses:
 *       201:
 *         description: Video uploaded successfully.
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
 *                   example: Video uploaded successfully.
 *                 uploadedVideo:
 *                   $ref: '#/components/schemas/Video'
 *       400:
 *         description: Bad request. No file uploaded or invalid file type.
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
 *                   example: No file uploaded or invalid file type.
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *           example: Example Video Title
 *       - in: formData
 *         name: video
 *         required: true
 *         schema:
 *           type: string
 *           format: binary
 *           example: file.mp4
 */


/**
 * @swagger
 * /api/auth/suggest-username:
 *   post:
 *     summary: Suggest username
 *     tags: [User Registration]
 *     security:
 *       - JWTAuth: []
 *     description: Endpoint to suggest username based on user's name and email.
 *     responses:
 *       '200':
 *         description: Username suggestions generated.
 *       '500':
 *         description: Error generating username suggestions.
 */

/**
 * @swagger
 * /api/auth/username-setup:
 *   post:
 *     summary: Setup username
 *     tags: [User Registration]
 *     description: Endpoint to setup user's username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Username setup successful.
 *       '400':
 *         description: Username already exists.
 *       '500':
 *         description: Error setting up username.
 */

/**
 * @swagger
 * /api/auth/notification:
 *   post:
 *     summary: Setup notification preference
 *     tags: [User Registration]
 *     description: Endpoint to setup user's notification preference.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notification:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Notification setup successful.
 *       '500':
 *         description: Error setting up notification preference.
 */

/**
 * @swagger
 * /api/auth/export:
 *   get:
 *     summary: Export user data
 *     tags: [Excel File]
 *     description: Endpoint to export user data as an Excel file.
 *     responses:
 *       '200':
 *         description: Excel file with user data downloaded successfully.
 *       '500':
 *         description: Error exporting users.
 */

/**
 * @swagger
 * /api/auth/import:
 *   post:
 *     summary: Import user data
 *     tags: [Excel File]
 *     description: Endpoint to import user data from an Excel file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Users imported successfully.
 *       '500':
 *         description: Error importing users.
 */



/**
 * @swagger
 * /api/auth/create-post:
 *   post:
 *     summary: Upload a new post
 *     description: This endpoint allows an authenticated user to upload a new post.
 *     tags:
 *       - Upload Post
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               description:
 *                 type: string
 *                 example: This is the description of my first post.
 *     responses:
 *       200:
 *         description: Post created successfully
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
 *                   example: Post created successfully
 *                 newPost:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ce"
 *                     postImageId:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109cd"
 *                     title:
 *                       type: string
 *                       example: My First Post
 *                     description:
 *                       type: string
 *                       example: This is the description of my first post.
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
 * /api/auth/{userId}/updateDob:
 *   put:
 *     summary: Update user's date of birth and age
 *     description: This endpoint allows an authenticated user to update their date of birth and age.
 *     tags:
 *       - Update DOB
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ce"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *     responses:
 *       200:
 *         description: User date of birth and age updated successfully
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
 *                   example: User date of birth and age updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ce"
 *                     dob:
 *                       type: string
 *                       format: date
 *                       example: 1990-01-01
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
 *                   example: Invalid date format
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
 *         description: User not found
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
 *                   example: User not found
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
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Internal server error
 *     security:
 *       - JWTAuth: []
 */
