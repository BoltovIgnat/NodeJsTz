global.fetch = require("node-fetch");

function getPosts (url, after, namefile) {
  return new Promise(function (resolve, reject) {
    fetch('https://www.reddit.com/r/' + url + '.json?limit=100&after='+ after).then(function(response) {
      return response.json();
    }).then(function(json) {
      var fs = require('fs');
      
      fs.appendFile(namefile, JSON.stringify(json.data.children) , (err) => { 
        if (err) { 
          console.log(err); 
        } 
      }); 

    });
  });
}

let receipts = new Array();

for (var i = 0; i < 10; i++) {
  receipts.push(getPosts("facepalm", i*100, "input.json"));
}

function good() {
  console.log('ibc good!');
}

function wrong(err) {
  console.log(err);
}

Promise.all(receipts).then(good).catch(wrong);