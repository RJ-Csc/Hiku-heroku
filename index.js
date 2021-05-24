const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');

const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const db = require('./models/db.js');
const routes = require('./routes/routes.js');

const app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false}));

dotenv.config();
hostname = process.env.HOSTNAME;
port = process.env.PORT;

db.connect();

app.use(session({
  'secret': 'hiku',
  'resave': false,
  'saveUninitialized': false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', routes);

app.use(function(req, res) {
  var details = {};

  if (req.session.username) {
    details.flag = true;
    details.username = req.session.username;
  }
  else {
    details.flag = false;
  }

  res.render('error', details);
});

hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});
hbs.registerHelper('bold', function (content) {
  return '<b>' + content.fn(this) + '</b>';
});
hbs.registerHelper('linebreaks', function (content) {
  content = hbs.Utils.escapeExpression(content);
  content = content.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new hbs.SafeString(content);;
});

app.listen(port, hostname, function() {
  console.log('Server is running at:');
  console.log('http://' + hostname + ':' + port);
});
