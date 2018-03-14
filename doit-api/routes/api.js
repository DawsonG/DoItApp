const router = require('express').Router();

const Controllers = require('../controllers');

router.use('/users', Controllers.Users.router);
router.use('/todos', Controllers.Todos.router);

module.exports = router;
