import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({}, { strict: false });

// 👇 Use EXACT name of the collection: 'transactions'
const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

export default Transaction;
