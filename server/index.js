const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var git = require('../helpers/github');
var mgdb= require('../database/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/',function(){
  
});
var user = ''

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log('repo', req.body.user);
  user = req.body.user;
  // console.log('dd', typeof ggit, git)
  // This route should take the github username provided
  // and get the repo information from the github API, then
  git.getReposByUsername(req.body.user, mgdb.save);
  /**** FIX ASYNC ISSUE call back!! */
  // save the repo information in the database through callback
  res.send('success');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos 
  //that have the most watchers
  console.log('user', user);
  mgdb.Repo.find({ login: user}).
  limit(25).
  sort({watchers_count: 'desc'}).
  exec((err, info)=>{
    if(err) console.log('err in mbdb');
    // console.log('-----get Repo:  ',info);
    res.send(JSON.stringify(info));
    // res.send(JSON.stringify([{name: 's'}]));
  });
});

app.post('/repo', function (req, res) {
  git.getRepo(req.body.link);
  res.send('data');
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

