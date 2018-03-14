const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const http = require('http');
const jwt = require('jsonwebtoken');

const config = require('./config/config.json');
const api = require('./routes/api');
const models = require('./models');

const app = express();

app.set('port', process.env.PORT || 3030);
app.use(bodyParser.json());
app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers.authorization;
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Request'
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// App Routes
app.use('/api/v1', api);

models.sequelize.sync().then(() => {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'))
  });
});
