let state = {
  reactions: ["thumbs up"],
  userId: 999
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
    postElm.className = 'post';
    postElm.dataset.index = nextItem-1;
    postElm.style.animation = '1s fadeAndSwipe ease-in ' + i*400 + "ms both";
    contentElm.insertBefore(postElm, lastPostElm);
    nextItem++
  }
}

function getPostHTML(postData) {
  let htmlString = ''
  let reactionsHTML = '<div class="reactions-cotainer">'
  for (let [reactionCode, reactors] of Object.entries(postData.reactions)) {
    if (reactors.length === 0) continue
    reactionsHTML += `
      <div class="reaction-container">
        <img src="./lib/openmoji-svg-black/${reactionCode}.svg"></img>
        <span class="amount amount-${reactionCode}">${reactors.length}</span>
      </div>
    `
  }
  reactionsHTML += '</div>'

  let postElm = document.createElement('div');
  let postReactedWith = postData.userReactedWith
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
    <button type="button" class="react-btn${postReactedWith? ' reacted' : ''}" onclick="reactBtnClicked(event, this)">
      <img src="./lib/openmoji-svg-color/${postReactedWith || '1F44D'}.svg"></img>
      <div class="reactions-menu">
        <img src="./lib/openmoji-svg-color/1F44D.svg" data-id="1F44D" onclick="handleReaction(event, this)"></img>
        <img src="./lib/openmoji-svg-color/1F63B.svg" data-id="1F63B" onclick="handleReaction(event, this)"></img>
        <img src="./lib/openmoji-svg-color/1F49D.svg" data-id="1F49D" onclick="handleReaction(event, this)"></img>
        <img src="./lib/openmoji-svg-color/1F4A6.svg" data-id="1F4A6" onclick="handleReaction(event, this)"></img>
      </div>
    </button>
  `

  return htmlString
}

function reactBtnClicked(event, elm) {
  let shownReactMenusElements = document.querySelectorAll(".reactions-menu.shown, .active-post")
  for (let i = 0; i < shownReactMenusElements.length; i++) {
    let elm = shownReactMenusElements[i]
    elm.classList.remove("shown")
    elm.classList.remove("active-post")
  }

  let parentElm = event.target.parentElement.parentElement
  parentElm.classList.add("active-post")

  elm.lastElementChild.classList.add("shown")
  event.stopPropagation()
}

function handleReaction(event, element) {
  let reactionCode = element.dataset.id
  let postIndex = element.parentElement.parentElement.parentElement.dataset.index
  let postElm = document.querySelector(`.post[data-index='${postIndex}']`)
  let postData = posts[postIndex]
  let postReactedWith = postData.userReactedWith
  console.log(postData);
  if (postReactedWith) {
    postData.userReactedWith = ''
    let userReactionIndex = postData.reactions[postReactedWith].indexOf(state.userId)
    postData.reactions[postReactedWith].splice(userReactionIndex, 1)
    if (postReactedWith !==  reactionCode) {
      postData.userReactedWith = reactionCode
      if (postData.reactions[reactionCode]) {
        postData.reactions[reactionCode].push(state.userId)
      } else {
        postData.reactions[reactionCode] = [state.userId]
      }
    }
  } else {
    postData.userReactedWith = reactionCode
    if (postData.reactions[reactionCode]) {
      postData.reactions[reactionCode].push(state.userId)
    } else {
      postData.reactions[reactionCode] = [state.userId]
    }
  }
  postElm.innerHTML = getPostHTML(postData)
  event.stopPropagation()
}

function bodyClicked(){
  let shownElements = document.querySelectorAll(".shown")
  if (!shownElements.length) return
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
    setTimeout(loadPosts, random(1000, 4000))
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

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
