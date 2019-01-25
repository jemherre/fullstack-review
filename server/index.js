const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var git = require('../helpers/github');
var mgdb= require('../database/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log('repo', req.body.user);
  console.log('dd', typeof ggit, git)
  // This route should take the github username provided
  // and get the repo information from the github API, then
  var userData = git.getReposByUsername(req.body.user,mgdb.save);
  // save the repo information in the database
  // console.log('USERDATA>> ',userData);
  // mgdb.save(userData);
  res.send('success');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

