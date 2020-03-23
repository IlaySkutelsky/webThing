const fs = require('fs')

let content = fs.readFileSync("posts.json");
let enojis = JSON.parse(content)
let reactions = ["1F44D", "1F44E", "1F496", "1F602", "1F62E", "1F622", "1F620"]


// console.log(enojis.length);

let newEmojisArray = []

for (let i = 0; i < enojis.length; i++) {
  let post = enojis[i]
  // console.log(i);
  post.userId = Math.floor(Math.random() * 100) + 1
  post.reactions = {}
  for (let j = 0; j < reactions.length; j++) {
    let reaction = reactions[j]
    let likers = []
    if (Math.random() < 0.14) {
      let likersAmount = Math.floor(Math.random() * Math.random() * 13)
      for (let k = 0; k < likersAmount; k++) {
        likers.push(Math.floor(Math.random() * 100))
      }
      post.reactions[reaction] = likers
    }
  }
  // delete newUser.uuid
  // delete newUser.salt
  // delete newUser.md5
  // delete newUser.sha1
  // delete newUser.sha256
  // delete emoji.subgroups
  // delete emoji.tags
  // delete emoji.openmoji_tags
  // delete emoji.openmoji_author
  // delete emoji.openmoji_date
  // delete emoji.skintone
  // delete emoji.skintone_combination
  // delete emoji.skintone_base_emoji
  // delete emoji.skintone_base_hexcode
  // delete emoji.unicode
  // delete emoji.order
  newEmojisArray.push(post)
}

// console.log(newEmojisArray[0]);

fs.writeFileSync('posts2.json', JSON.stringify(newEmojisArray), null, 4)
