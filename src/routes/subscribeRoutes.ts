import express from "express";
import { subscribe, getSubscribers, deleteSubscriber } from "../controllers/subscribeController";
import { validateEmail } from "../middleware/validateEmail";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscribers
 *   description: Newsletter subscriptions
 */

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: yvan@example.com
 *     responses:
 *       201:
 *         description: Subscriber added
 */
router.post("/", validateEmail, subscribe);

/**
 * @swagger
 * /api/subscribe:
 *   get:
 *     summary: Get all subscribers
 *     tags: [Subscribers]
 *     responses:
 *       200:
 *         description: List of subscribers
 */
router.get("/", getSubscribers);

/**
 * @swagger
 * /api/subscribe/{id}:
 *   delete:
 *     summary: Delete subscriber by ID
 *     tags: [Subscribers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscriber ID
 *     responses:
 *       200:
 *         description: Subscriber deleted
 */
router.delete("/:id", deleteSubscriber);

export default router;
