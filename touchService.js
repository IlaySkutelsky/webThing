

let currentShape = [];

let body = document.querySelector("body")

window.addEventListener('touchstart', function onFirstTouch() {
  window.USER_IS_TOUCHING = true;
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

body.addEventListener('touchstart', (e) => {
  let mouseX = e.touches[0].clientX
  let mouseY = e.touches[0].clientY
  currentShape.push({x: mouseX, y: mouseY})
})

body.addEventListener('touchend', (e) => {
  let mouseX = e.changedTouches[0].clientX
  let mouseY = e.changedTouches[0].clientY
  currentShape.push({x: mouseX, y: mouseY})
  renderSVG(currentShape)
  currentShape = [];
})
