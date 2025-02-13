import express from 'express';
const thoughtsRouter = express.Router();
import Thought from '../../models/Thought.js'; 


thoughtsRouter.get('/', async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});


thoughtsRouter.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
});


thoughtsRouter.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.status(201).json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});


thoughtsRouter.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    } catch (err) {
        return res.status(400).json(err);
    }
});


thoughtsRouter.delete('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
});



export { thoughtsRouter as thoughtsRouter};