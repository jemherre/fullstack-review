const request = require('request');
const config = require('../config');
var saveDB = require('../database/index');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };


  request(options, function(err, response, body){
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      var result = [];
      for(var i = 0; i < info.length; i++){
        var data = {
          name: info[i].name,
          login: info[i].owner.login,
          full_name: info[i].full_name,
          url : info[i].url,
          description: info[i].description,
          commits_url: info[i].commits_url,
          created_at: info[i].created_at,
          updated_at: info[i].updated_at,
          pushed_at: info[i].pushed_at,
          watchers_count: info[i].watchers_count
        };
        result.push(data);
      }
      return cb(result);
    } else {
      return cb(err);
    }
  });
}

var getRepo = function(link, cb){
  let options = {
    url: link,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, response, body){
    if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      return cb(null,data);
    } else {
      return cb(err, null);
    }
  });
}

module.exports = {getReposByUsername, getRepo};