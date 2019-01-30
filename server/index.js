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
  user = req.body.user;
  // This route should take the github username provided
  // and get the repo information from the github API, then
  git.getReposByUsername(req.body.user, (data)=>{
    mgdb.save(data, (err)=>{
      if(err) { 
        console.log('ERROR: ',err)
      } else {
        res.send('Data saved onto Database');
      }
    });
  });
});

app.get('/repos', function (req, res) {
  mgdb.Repo.find({ login: user}).
  limit(25).
  sort({watchers_count: 'desc'}).
  exec((err, info)=>{
    if(err) console.log('err in mbdb');
    res.send(JSON.stringify(info));
  });
});

app.post('/repo', function (req, res) {
  git.getRepo(req.body.link,(err,data)=>{
    if(err) { res.send('ERROR: ', err);
  } else {
    res.send(JSON.stringify(data));
  }
  });
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

