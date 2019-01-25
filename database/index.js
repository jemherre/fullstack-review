const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
    name: String,
    full_name: String,
    url : String,
    description: String,
    commits_url: String,
    created_at: Date,
    updated_at: Date,
    pushed_at: Date,
    watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if(typeof repos === 'object'){//expecting an array of objects/documents
    console.log('repo -for loop');
    for(var i = 0; i< repos.length; i++){ //maybe we don't need this
      var repo = new Repo(repos[i]);
      repo.save(function(err, repo){
        if(err) console.log('err');
      });
    }
  } else { //save a single object/document onto db
    console.log('single:', repos);
    var repo = new Repo(repos);
    repo.save(function(err, repo){
      if(err) console.log('err');
    });
  }
}

module.exports.save = save;