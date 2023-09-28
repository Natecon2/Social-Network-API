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

// DELETE a thought by its _id
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


module.exports = router;