import express from 'express';
import Transaction from '../models/Transaction';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Get all transactions (no filters for now)
router.get('/', protect, async (req, res) => {
  try {
  const transactions = await Transaction.find();
  console.log('📦 Transactions fetched from DB:', transactions); // Add this line
  res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error while fetching transactions' });
  }
});

export default router;
