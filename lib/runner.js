const fs = require('fs')

let content = fs.readFileSync("users.json");
let enojis = JSON.parse(content)

// console.log(enojis.length);

let newEmojisArray = []

for (var i = 0; i < enojis.length; i++) {
  let emoji = enojis[i]

  emoji.id = i+1
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
  newEmojisArray.push(emoji)
}

console.log(newEmojisArray[0]);

fs.writeFileSync('users2.json', JSON.stringify(newEmojisArray), null, 4)
