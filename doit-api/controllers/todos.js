const router = require('express').Router();
const moment = require('moment');
const { find } = require('lodash');

const Todo = require('../models').Todo;

router.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(403);
  }

  try {
    const todos = await Todo.findAll({
      where: {
        UserId: req.user.id,
        $or: {
          dueDate: {
            $gte: moment().subtract(2, 'days').toDate()
          },
          isComplete: false,
        }
      },
      order: ['sortOrder']
    });

    return res.json({ success: true, todos });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(403);
  }

  try {
    const { task, dueDate, priority } = req.body;
    const item = await Todo.create({ UserId: req.user.id, description: task, dueDate, priority });

    return res.json({ success: true, item })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
});

router.post('/complete', async (req, res) => {
  if (!req.user) {
    return res.status(403);
  }

  try {
    const { id, isComplete } = req.body;
    const item = await Todo.findOne({
      where: {
        UserId: req.user.id,
        id
      }
    });

    if (item) {
      await item.update({ isComplete });
      return res.json({ success: true, item });
    }

    return res.status(500).json({ success: false, message: 'No item to change' });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

router.post('/reorder', (req, res) => {
  if (!req.user) {
    return res.status(403);
  }

  const { items } = req.body;

  try {
    items.forEach(async (item, i) => {
      await Todo.update({ sortOrder: item.sortOrder }, { where: { UserId: req.user.id, id: item.id }});
    });

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = { router };
