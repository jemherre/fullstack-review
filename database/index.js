const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
    name: {type: String, index: {unique: true}},
    full_name: String,
    login: String,
    url : String,
    description: String,
    commits_url: String,
    created_at: Date,
    updated_at: Date,
    pushed_at: Date,
    watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {
  if(typeof repos === 'object'){//expecting an array of objects/documents
    
    for(var i = 0; i< repos.length;i++){ //maybe we don't need this
      Repo.findOne({name: repos[i].name}).update({name: repos[i].name},repos[i],{upsert: true}).exec((err, num)=>{
        if(err) return cb(err);
      });
    }
    return cb(null);
  } else { //save a single object/document onto db
    Repo.findOne({name: repos.name}).update({name: repos.name},repos,{upsert: true}).exec((err, num)=>{
      if(err) return cb(err);
    });
    return cb(null);
  }
}

module.exports = {save, Repo};