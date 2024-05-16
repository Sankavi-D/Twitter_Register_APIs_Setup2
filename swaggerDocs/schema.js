
/**
 * @swagger
 * tags:
 *   name: User Registration
 *   description: User registration endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - dob
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         dob:
 *           type: string
 *           format: date
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         dob: 1990-01-01
 *     Password:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *       example:
 *         password: "password123"
 *     Image:
 *       type: object
 *       required:
 *         - image
 *         - type
 *       properties:
 *         image:
 *           type: string
 *         type:
 *           type: string
 *           enum:
 *             - profile
 *             - post
 *       example:
 *         image: "base64-encoded-image-string"
 *         type: "profile"
 *     Username:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           pattern: "^[a-zA-Z0-9_]+$"
 *       example:
 *         username: "john_doe123"
 *     Notification:
 *       type: object
 *       required:
 *         - notification
 *       properties:
 *         notification:
 *           type: boolean
 *       example:
 *         notification: true
 *     Language:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         name:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *       example:
 *         name: "English"
 *         status: "active"
 *     CategorySelection:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         categoryName:
 *           type: string
 *       example:
 *         categoryName: "Technology"
 *     SubcategorySelection:
 *       type: object
 *       required:
 *         - subcategoryName
 *         - categoryId
 *       properties:
 *         subcategoryName:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 1
 *         categoryId:
 *           type: string
 *       example:
 *         subcategoryName: ["Programming", "Development"]
 *         categoryId: "5fe7c3f5b8e87f28641f8234"
 *     SubcategoryUpdate:
 *       type: object
 *       required:
 *         - subcategoryName
 *       properties:
 *         subcategoryName:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 1
 *       example:
 *         subcategoryName: ["Software Development"]
 *     Follow:
 *       type: object
 *       required:
 *         - userIds
 *       properties:
 *         userIds:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *       example:
 *         userIds: ["5fe7c3f5b8e87f28641f8234", "5fe7c3f5b8e87f28641f8235"]
 *     UserLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: "john_doe123"
 *         password: "password123"
 *     Date:
 *       type: object
 *       required:
 *         - dob
 *       properties:
 *         dob:
 *           type: string
 *           format: date
 *       example:
 *         dob: "1990-01-01"
 */
