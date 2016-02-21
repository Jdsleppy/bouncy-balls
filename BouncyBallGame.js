var bouncyBallsCanvas = document.getElementById("bouncy-ball");
var canvasContext = bouncyBallsCanvas.getContext("2d");
var balls = [];
var firstBall = {
    positionX:150,
    positionY:150,
    velocityX:100,
    velocityY:100,
    radius:10,
    color:"#00FF00"
};
balls.push(firstBall);

var frameDuration = 30; // temporal duration of one frame in milliseconds

function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function addBall(event) {
    alert("in addBall()");
    coords = canvas.relMouseCoords(event);
    var newBall = {
        positionX:coords.X,
        positionY:coords.Y,
        velocityX:50,
        velocityY:50,
        radius:10,
        color:"#00FF00"
    };
    balls.push(newBall);
}

bouncyBallsCanvas.onclick = addBall;

function animateBalls() {
    for (i = 0; i < balls.length; i++) {
        animateBall(balls[i]);
    }
}

function animateBall(ball) {
		var deltaX = ball.velocityX * (frameDuration / 1000);
    var deltaY = ball.velocityY * (frameDuration / 1000);
    // x movement and bounce
    if ((ball.positionX + deltaX) < 0) {
        ball.positionX = 0;
        ball.velocityX *= -1;
    }
    else if ((ball.positionX + deltaX) < bouncyBallsCanvas.width) {
        ball.positionX += deltaX;
    } else {
        ball.positionX = bouncyBallsCanvas.width;
        ball.velocityX *= -1;
    }
    // y movement and bounce
    if ((ball.positionY + deltaY) < 0) {
        ball.positionY = 0;
        ball.velocityY *= -1;
    }
    else if ((ball.positionY + deltaY) < bouncyBallsCanvas.height) {
        ball.positionY += deltaY;
    } else {
        ball.positionY = bouncyBallsCanvas.height;
        ball.velocityY *= -1;
    }
}

function drawBalls() {
    for (i = 0; i < balls.length; i++) {
        drawBall(balls[i]);
    }
}

function drawBall(ball) {
    canvasContext.beginPath();
    canvasContext.arc(
        ball.positionX,
        ball.positionY,
        ball.radius,
        0, 2 * Math.PI);
    canvasContext.fillStyle=ball.color;
    canvasContext.fill();
    canvasContext.closePath();
}

function redrawBalls() {
    canvasContext.clearRect(
        0,
        0,
        bouncyBallsCanvas.width,
        bouncyBallsCanvas.height);
    animateBalls();
    drawBalls();
}

animationHandle = setInterval(redrawBalls, frameDuration);

// To stop animation
//clearInterval(animationHandle);
