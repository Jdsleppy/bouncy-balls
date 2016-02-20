var bouncyBallsCanvas = document.getElementById("bouncy-balls");

var balls = [];

animationHandle = setTimeout(function, 30);

function animateBalls() {
    for (i = 0; i < balls.length; i++) {
   	    animateBall(balls[i]);
    }
}

function animateBall(ball) {
		
}

/* Use to stop animation */
/*clearTimeout(animationHandle);*/
