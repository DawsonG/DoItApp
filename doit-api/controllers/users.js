const jwt = require('jsonwebtoken');
const omit = require('lodash/Omit');
const router = require('express').Router();

const config = require('../config/config.json');
const User = require('../models').User;

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email }});

    if (!user) {
      return res.status(403).json({ success: false });
    } else {
      if (user.validPassword(password)) {
        return res.json({
          success: true,
          user: omit(user.toJSON(), 'hash', 'salt'),
          token: user.generateJWT()
        });
      }

      return res.status(403).json({ success: false });
    }
  } catch (e) {
    console.error(e);
    return res.status(403).json({ success: false, message: 'Server cannot load auth service.' });
  }
});

router.post('/self', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ success: false });
  }

  try {
    const tokenData = jwt.verify(token, config.secret);

    const user = await User.findById(tokenData.id);
    return res.json({
      success: true,
      user: omit(user.toJSON(), 'hash', 'salt'),
      token: user.generateJWT()
    });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, error: e.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, hash: password });

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, error: e.message });
  }
});

module.exports = { router };
