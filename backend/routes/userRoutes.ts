import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Define local custom request type
interface AuthRequest extends Request {
  userId?: string;
}

// ✅ GET profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('🔐 Inside GET /user/profile');
    console.log('🧾 User ID:', req.userId);

    if (!req.userId) {
      res.status(401).json({ message: 'Unauthorized: Missing userId' });
      return;
    }

    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    
    });
  } catch (err: any) {
    console.error('❌ Error in /profile:', err.message);
    res.status(500).json({ message: 'Server error in profile route' });
  }
});


// ✅ UPDATE profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    console.log('🔍 Incoming update profile request body:', req.body);
    console.log('👤 Authenticated userId:', req.userId);

    const { name, email, avatar } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Only update allowed fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    await user.save();

    console.log('✅ Profile updated:', user);

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });

  } catch (err: any) {
    console.error('❗ Error updating profile:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// ✅ UPDATE password
router.put('/update-password', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { old, new: newPassword } = req.body;

    console.log('📥 Password Update Request:', req.body);

    const user = await User.findById(req.userId);
    if (!user || !user.password) {
      console.log('❌ User not found or no password');
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(old, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect old password');
      res.status(400).json({ message: 'Incorrect old password' });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    console.log('✅ Password updated successfully');
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('❌ Error updating password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// ✅ LOGOUT ALL DEVICES
router.post('/logout-all', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Optionally invalidate sessions — for now, just send success
    res.status(200).json({ message: 'Logged out from all devices' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
