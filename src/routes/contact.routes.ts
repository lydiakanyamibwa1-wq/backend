import { Router } from 'express';
import { createContact } from '../controllers/Contactcontroller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form submissions
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lydia
 *               email:
 *                 type: string
 *                 example: lydia@example.com
 *               message:
 *                 type: string
 *                 example: Hello! I have a question.
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post('/contact', createContact);

export default router;
