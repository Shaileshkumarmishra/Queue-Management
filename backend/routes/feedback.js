const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// POST route to submit feedback
router.post('/feedback', async (req, res) => {
  const { feedback } = req.body;

  if (!feedback || feedback.trim().length === 0) {
    return res.status(400).json({ message: 'Feedback cannot be empty' });
  }

  try {
    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// GET route to fetch all feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Failed to load feedback' });
  }
});

module.exports = router;
