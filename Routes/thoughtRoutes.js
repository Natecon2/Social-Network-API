const express = require('express');
const router = express.Router();
const { Thought } = require('../models');

// POST a new thought
router.post('/thoughts', async (req, res) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT to update a thought by its _id
router.put('/thoughts/:thoughtId', async (req, res) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndRemove(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(deletedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new reaction for a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    const newReaction = { reactionBody, username };
    thought.reactions.push(newReaction);
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction._id.toString() === reactionId
    );

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    thought.reactions.splice(reactionIndex, 1);

    await thought.save();

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
