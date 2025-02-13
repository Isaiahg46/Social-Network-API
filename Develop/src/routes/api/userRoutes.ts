import { Router } from 'express';
const userRouter = Router();
import User from '../../models/User.js';


userRouter.get('/', async (_, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});


userRouter.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});


userRouter.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});


userRouter.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(400).json(err);
    }
});


userRouter.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
});


export { userRouter as userRouter};