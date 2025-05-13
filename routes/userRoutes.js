const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/subscribe', async (req, res) => {
  const { username, schedule, hourGMT } = req.body;

  try {
    const user = await User.create({ username, schedule, hourGMT });
    res.status(201).json({ message: '✅ تم الاشتراك بنجاح', user });
  } catch (error) {
    res.status(500).json({ error: '❌ حدث خطأ أثناء الاشتراك' });
  }
});

module.exports = router;
