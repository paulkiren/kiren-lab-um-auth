// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import { emailRouter } from './routes/emailRoutes.js';
import { setupMessageQueue } from './config/queue.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/email', emailRouter);

// Setup error handling
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize message queue consumer
setupMessageQueue().catch(err => {
  logger.error('Failed to setup message queue:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  logger.info(`Email service running on port ${PORT}`);
});