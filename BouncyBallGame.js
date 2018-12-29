"use strict";
var Vector = (function () {
    function Vector(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    return Vector;
}());
var Ball = (function () {
    function Ball(position, velocity, radius, color) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
    }
    return Ball;
}());
var ColorPicker = (function () {
    function ColorPicker(colors) {
        this.colors = colors;
    }
    ColorPicker.prototype.next = function () {
        var color = this.colors.shift();
        this.colors.push(color);
        return color;
    };
    return ColorPicker;
}());
var balls = [];
var colorPicker = new ColorPicker([
    "#095903",
    "#ED5407",
    "#032459",
    "#590303"
]);
var frameDurationMs = 15;
var bouncyBallsCanvas = document.getElementById("bouncy-ball");
var canvasContext = bouncyBallsCanvas.getContext("2d");
bouncyBallsCanvas.onclick = function (ev) {
    var newBall = new Ball(eventCoordsOnElement(ev, bouncyBallsCanvas), newBallVelocity(), 5 + (Math.random() * 15), colorPicker.next());
    balls.push(newBall);
};
function eventCoordsOnElement(ev, elem) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var currentElement = elem;
    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while (currentElement = currentElement.offsetParent);
    var canvasX = ev.pageX - totalOffsetX;
    var canvasY = ev.pageY - totalOffsetY;
    return new Vector(canvasX, canvasY);
}
function newBallVelocity() {
    var initialSpeed = (bouncyBallsCanvas.width + bouncyBallsCanvas.height) / 8;
    var splay = 0.5 + Math.random();
    var speed = initialSpeed * splay;
    var direction = Math.random() * 2 * Math.PI;
    return new Vector(speed * Math.cos(direction), speed * Math.sin(direction));
}
function animateBall(ball) {
    var deltaX = ball.velocity.X * (frameDurationMs / 1000);
    var deltaY = ball.velocity.Y * (frameDurationMs / 1000);
    if ((ball.position.X + deltaX - ball.radius) < 0) {
        ball.position.X = ball.radius;
        ball.velocity.X *= -1;
    }
    else if ((ball.position.X + deltaX + ball.radius) < bouncyBallsCanvas.width) {
        ball.position.X += deltaX;
    }
    else {
        ball.position.X = bouncyBallsCanvas.width - ball.radius;
        ball.velocity.X *= -1;
    }
    if ((ball.position.Y + deltaY - ball.radius) < 0) {
        ball.position.Y = ball.radius;
        ball.velocity.Y *= -1;
    }
    else if ((ball.position.Y + deltaY + ball.radius) < bouncyBallsCanvas.height) {
        ball.position.Y += deltaY;
    }
    else {
        ball.position.Y = bouncyBallsCanvas.height - ball.radius;
        ball.velocity.Y *= -1;
    }
}
function drawBall(ball) {
    canvasContext.beginPath();
    canvasContext.arc(ball.position.X, ball.position.Y, ball.radius, 0, 2 * Math.PI);
    canvasContext.fillStyle = ball.color;
    canvasContext.fill();
    canvasContext.closePath();
}
function redrawBalls() {
    canvasContext.clearRect(0, 0, bouncyBallsCanvas.width, bouncyBallsCanvas.height);
    balls.forEach(animateBall);
    balls.forEach(drawBall);
}
var animationHandle = setInterval(redrawBalls, frameDurationMs);
