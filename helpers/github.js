const request = require('request');
const config = require('../config');

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
          full_name: info[i].fullname,
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
      console.log('RESULT!!! ',result);
      cb(result);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;