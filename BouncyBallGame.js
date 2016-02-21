var bouncyBallsCanvas = document.getElementById("bouncy-balls");
var balls = [];
var frameDuration = 30; /* temporal duration of one frame in milliseconds */

animationHandle = setTimeout(function, frameDuration);

function animateBalls() {
    for (i = 0; i < balls.length; i++) {
        animateBall(balls[i]);
    }
}

function animateBall(ball) {
		var deltaX = ball.velocityX * (frameDuration / 1000);
    var deltaY = ball.velocityY * (frameDuration / 1000);
    /* x movement and bounce */
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
    /* y movement and bounce */
    if ((ball.positionY + deltaY) < 0) {
        ball.positionY = 0;
        ball.velocityY *= -1;
    }
    else if ((ball.positionY + deltaXY) < bouncyBallsCanvas.height) {
        ball.positionY += deltaY;
    } else {
        ball.positionY = bouncyBallsCanvas.height;
        ball.velocityY *= -1;
    }
}

/* Use to stop animation */
/*clearTimeout(animationHandle);*/


