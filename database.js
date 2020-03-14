
let posts
let users
let emojis

loadJSON('posts.json', (data) => {
  // console.log("got json data:");
  // console.log(JSON.parse(data));
  posts = JSON.parse(data)
})

loadJSON('users.json', (data) => {
  // console.log("got json data:");
  // console.log(JSON.parse(data));
  users = JSON.parse(data)
})

loadJSON('lib/openmoji.json', (data) => {
  // console.log("got json data:");
  // console.log(JSON.parse(data));
  emojis = JSON.parse(data)
})

function getEmojiCode(annotation) {
  let emoji = emojis.find(emoji => emoji.annotation == annotation);
  return emoji.hexcode
}

function getEmojiAnnotation(code) {
  let emoji = emojis.find(emoji => emoji.hexcode == code);
  return emoji.annotation
}


if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

let db
let postsRequest = window.indexedDB.open("database", 1);

postsRequest.onerror = function(event) {
  // Do something with request.errorCode!
  // console.log("postsRequest got error:");
  // console.log(event);
};
postsRequest.onsuccess = function(event) {
  // Do something with request.result!
  // console.log("postsRequest got success:");
  // console.log(event);
  db = event.target.result;
  handleDB()
};

function handleDB() {
  db.onerror = function(event) {
    // Generic error handler for all errors targeted at this database's requests!
    console.error("Database error: " + event.target.errorCode);
  };


}

function loadJSON(filename, callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }
