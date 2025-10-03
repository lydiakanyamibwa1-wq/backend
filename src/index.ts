import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { connectDB } from "./config/db";

// ✅ Swagger imports
import swaggerUi from "swagger-ui-express";   // Swagger UI
import swaggerJsdoc from "swagger-jsdoc";     // Swagger generator

// Routes
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import subscribeRoutes from "./routes/subscribe.routes";
import contactRoutes from "./routes/contact.routes";

const app: Application = express();

/* 
=================================
✅ CORS Configuration
=================================
*/
const allowedOrigins = [
  "http://localhost:5173",      // Local frontend
  "http://127.0.0.1:5173",      // Local frontend alternative
  "http://192.168.1.109:5173",  // LAN IP
  "http://localhost:7000",      // Local Swagger
  "https://shop-80ey.onrender.com", // ✅ Deployed Render domain
  "https://frontend-zeta-brown-81.vercel.app" // ✅ Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`❌ Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* 
=================================
✅ Swagger Setup
=================================
*/
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop API",
      version: "1.0.0",
      description: "API documentation for Shop project",
    },
    servers: [
      { url: "http://localhost:7000" },
      { url: "https://shop-80ey.onrender.com" } // ✅ Add deployed base URL
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* 
=================================
✅ API Routes
=================================
*/
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api", contactRoutes);

/* 
=================================
✅ Server Setup
=================================
*/
const PORT = process.env.PORT || 7000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Swagger Docs: http://localhost:${PORT}/api-docs`);
});