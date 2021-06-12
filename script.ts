
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if(xhr.status === 200){
      console.log(xhr.responseText)
      var fs = require('fs');
      fs.writeFile ("input.json", JSON.stringify(xhr.responseText), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
      
    }
  }
}
xhr.open('GET', 'https://www.reddit.com/r/Battlefield.json')
xhr.send()