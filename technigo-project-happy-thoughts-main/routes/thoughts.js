import express from 'express';
import { Thought } from '../models/Thought.js';
const API_URL = 'https://your-deployed-api.onrender.com/thoughts';

const router = express.Router();

// GET /thoughts?sort=hearts|createdAt&order=asc|desc&category=Project
router.get('/', async (req, res) => {
  const { sort = 'createdAt', order = 'desc', category } = req.query;

  try {
    const query = category ? { category } : {};
    const thoughts = await Thought.find(query)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .limit(20);
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch thoughts', details: err });
  }
});

// POST /thoughts
router.post('/', async (req, res) => {
  const { message, category, username } = req.body;

  try {
    const thought = new Thought({ message, category, username });
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: 'Invalid input', details: err });
  }
});

// POST /thoughts/:thoughtId/like
router.post('/:thoughtId/like', async (req, res) => {
  const { thoughtId } = req.params;

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) return res.status(404).json({ error: 'Thought not found' });

    thought.hearts += 1;
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request', details: err });
  }
});

export default router;