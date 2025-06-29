import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true, required: false},
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  avatar: { type: String },
});

export default mongoose.model('User', userSchema);
