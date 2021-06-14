global.fetch = require("node-fetch");
var fs = require('fs');

function getPosts (url, after, namefile) {
  return new Promise(function (resolve, reject) {
    fetch('https://www.reddit.com/r/' + url + '.json?limit=100&after='+ after).then(function(response) {
      return response.json();
    }).then(function(json) {
      
      fs.appendFile(namefile, JSON.stringify(json.data.children) , (err) => { 
        resolve(namefile)
        if (err) { 
          console.log(err); 
        } 
      }); 
    });
  });
}

let receipts = new Array();

for (var i = 0; i < 10; i++) {
  receipts.push(getPosts("facepalm", i*100, "input"+ i+".json"));
}


function good() {
  
  console.log('ibc here!');
  var files = fs.readdirSync(process.cwd());
  fs.unlinkSync("result.json");
  for (let i in files){
      
    if(files[i].indexOf('input') == 0){
      
      let data = fs.readFileSync(files[i], "utf8");
      fs.appendFile('result.json', data, (err) => { 
        fs.unlinkSync(files[i]);
        if (err) { 
          console.log(err); 
        }
      });
    }
  }
}

function wrong(err) {
  console.log(err);
}

Promise.all(receipts).then(good).catch(wrong);