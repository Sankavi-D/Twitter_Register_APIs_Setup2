/**
 * @swagger
 * /api/auth/languages:
 *   post:
 *     summary: Create a new language
 *     description: Create a new language entry. Requires a valid JWT token.
 *     tags:
 *       - Language
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       '200':
 *         description: Language created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       '400':
 *         description: Bad request. Invalid parameters provided.
 *       '401':
 *         description: Unauthorized. JWT token missing or invalid.
 *       '500':
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all languages
 *     description: Retrieve all languages.
 *     tags:
 *       - Language
 *     responses:
 *       '200':
 *         description: List of languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *       '500':
 *         description: Internal server error
 *
 * /api/auth/languages/{id}:
 *   get:
 *     summary: Get a specific language by ID
 *     description: Retrieve a specific language by its ID.
 *     tags:
 *       - Language
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Language ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Language found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       '404':
 *         description: Language not found
 *       '500':
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a language by ID
 *     description: Update a language entry by its ID. Requires a valid JWT token.
 *     tags:
 *       - Language
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Language ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       '200':
 *         description: Language updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       '400':
 *         description: Bad request. Invalid parameters provided.
 *       '401':
 *         description: Unauthorized. JWT token missing or invalid.
 *       '404':
 *         description: Language not found
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a language by ID
 *     description: Delete a language entry by its ID. Requires a valid JWT token.
 *     tags:
 *       - Language
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Language ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Language deleted successfully
 *       '401':
 *         description: Unauthorized. JWT token missing or invalid.
 *       '404':
 *         description: Language not found
 *       '500':
 *         description: Internal server error
 */
