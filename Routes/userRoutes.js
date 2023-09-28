const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single user by their _id and populate thoughts and friends
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT to update a user by their _id
router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE to remove user by their _id
router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndRemove(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
