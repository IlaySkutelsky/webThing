let state = {
  reactions: ["thumbs up"]
}


function renderSVG(shapePoints) {
  let svg = document.getElementsByTagName('svg')[0]; //Get svg element
  let startPoint = shapePoints[0]
  let endPoint = shapePoints[1]

  let x1 = (startPoint.x+endPoint.x+(endPoint.y-startPoint.y)*0.2)/2
  let y1 = (startPoint.y+endPoint.y+(startPoint.x-endPoint.x)*0.2)/2
  let x2 = (startPoint.x+endPoint.x+(startPoint.y-endPoint.y)*0.2)/2
  let y2 = (startPoint.y+endPoint.y+(endPoint.x-startPoint.x)*0.2)/2

  let newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  newElement.setAttribute("d",`M ${startPoint.x},${startPoint.y}
                               Q ${x1},${y1} ${endPoint.x}, ${endPoint.y}
                               Q ${x2},${y2} ${startPoint.x}, ${startPoint.y}`);
  newElement.style.fill = "#00502060"; //Set stroke colour
  newElement.style.filter = "url(#smudge)";
  svg.appendChild(newElement);
}

let nextItem = 1;
function loadPosts() {
  if (!posts) return
  let contentElm = document.querySelector("section.content");
  let lastPostElm = document.querySelector("div.last-post");
  let amountOfPosts = random(3,7)
  for (let i = 0; i < amountOfPosts; i++) {
    if (!posts[nextItem-1]) {
      noMoreContent()
      break
    }

    let postData = posts[nextItem-1]
    let postElm = document.createElement('div');
    postElm.innerHTML = getPostHTML(postData)
    postElm.className = 'post post' + nextItem;
    postElm.style.animation = '1s fadeAndSwipe ease-in ' + i*400 + "ms both";
    contentElm.insertBefore(postElm, lastPostElm);
    nextItem++
  }
}

function getPostHTML(postData) {
  let htmlString = ''
  let reactionsHTML = '<div class="reactions-cotainer">'
  for (let [reaction, reactors] of Object.entries(postData.reactions)) {
    let emoji = emojis.find(emoji => emoji.annotation == reaction);
    let reactionCode = emoji. hexcode
    reactionsHTML += `
      <div class="reaction-container">
        <img src="./lib/openmoji-svg-black/${reactionCode}.svg"></img>
        <span class="amount amount-${reactionCode}">${reactors.length}</span>
      </div>
    `
  }
  reactionsHTML += '</div>'

  let postElm = document.createElement('div');
  let user = users.find(user => user.id === postData.userId)
  htmlString = `
    <div class="user">
      <img class="avatar" src="https://api.adorable.io/avatars/285/${user.id}@adorable.io.png">
      <span class="nick">${user.username}</span>
    </div>
    <span class="text">
      ${postData.text}
    </span>
    ${reactionsHTML}
    <button type="button" class="react-btn" onclick="reactBtnClicked(event, this)">
      <img src="./lib/openmoji-svg-color/1F44D.svg"></img>
    </button>
  `

  return htmlString
}

function reactBtnClicked(event, elm) {
  elm.lastElementChild.classList.add("shown")
  event.stopPropagation()
}

function bodyClicked(){
  let shownElements = document.querySelectorAll(".shown")
  for (let i = 0; i < shownElements.length; i++) {
    let elm = shownElements[i]
    elm.classList.remove("shown")
  }
}

let observer = new IntersectionObserver(intersectionCallback);
let lastPostElm = document.querySelector("div.last-post");
observer.observe(lastPostElm);

function intersectionCallback(entries, observer) {
  // console.log("intersected");
  // console.log(entries);
  if (entries[0].isIntersecting) {
    // setTimeout(loadPosts, random(1000, 4000))
  }
  if (window.USER_IS_TOUCHING ) paintCanvas()
}

function paintCanvas() {
  let scrolledDistance = window.pageYOffset
  let canvasElm = document.getElementById("canvas");

}

function noMoreContent() {
  console.log("no more content");
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
