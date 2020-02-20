let shapes = [];
let currentShape = [];

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  noLoop()
}

function draw() {
  noStroke()
  fill(0,10,5,1)
  for (let i = 0; i < shapes.length; i++) {
    let shapePoints = shapes[i]
    let size = 20;
    let startPoint = shapePoints[0]
    let endPoint = shapePoints[1]


    beginShape()

    vertex(startPoint.x, startPoint.y)
    // curveVertex(startPoint.x, startPoint.y)
    let x1 = (startPoint.x+endPoint.x+(endPoint.y-startPoint.y)*0.2)/2
    let y1 = (startPoint.y+endPoint.y+(startPoint.x-endPoint.x)*0.2)/2
    let x2 = (startPoint.x+endPoint.x+(startPoint.y-endPoint.y)*0.2)/2
    let y2 = (startPoint.y+endPoint.y+(endPoint.x-startPoint.x)*0.2)/2
    quadraticVertex(x1, y1, endPoint.x, endPoint.y)
    // bezierVertex(x1, y1, endPoint.x, endPoint.y)
    quadraticVertex(x2, y2, startPoint.x, startPoint.y)
    // curveVertex(x1, y1)
    // curveVertex(endPoint.x, endPoint.y)
    vertex(endPoint.x, endPoint.y)
    // quadraticVertex(x2, y2, startPoint.x, startPoint.y)
    // curveVertex(x2, y2)
    vertex(startPoint.x, startPoint.y)
    // curveVertex(startPoint.x, startPoint.y)

    endShape()

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function touchStarted() {
  // console.log('touchStarted');
  currentShape.push(createVector(mouseX, mouseY))
}

function touchMoved() {
  // if (currentShape[currentShape.length-1]) {
  //   let distance = createVector(mouseX, mouseY).dist(currentShape[currentShape.length-1])
  //   if (distance > 20) {
  //     currentShape.push(createVector(mouseX, mouseY))
  //   }
  // } else {
  //   currentShape.push(createVector(mouseX, mouseY))
  // }
}

function touchEnded() {
  // console.log('touchEnded');
  currentShape.push(createVector(mouseX, mouseY))
  shapes.push(currentShape)
  currentShape = [];
  redraw()
}
