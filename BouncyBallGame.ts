class Vector {
    constructor(
        public X: number, 
        public Y: number
    ) {}
}

class Ball {
    constructor(
        public position: Vector, 
        public velocity: Vector, 
        public radius: number, 
        public color:string
    ) {}
}

class ColorPicker {
    constructor(colors: string[]) {
        this.colors = colors;
    }
    colors: string[];

    next(): string {
        const color: string = this.colors.shift();
        this.colors.push(color);
        return color;
    }
}

const balls: Ball[] = [];
const colorPicker = new ColorPicker([
    "#095903",
    "#ED5407",
    "#032459",
    "#590303"
]);

const frameDurationMs: number = 15; // temporal duration of one frame in milliseconds

const bouncyBallsCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("bouncy-ball");
const canvasContext: CanvasRenderingContext2D = bouncyBallsCanvas.getContext("2d");
bouncyBallsCanvas.onclick = (ev: MouseEvent) => {    
    const newBall = new Ball(
        eventCoordsOnElement(ev, bouncyBallsCanvas),
        newBallVelocity(),
        5 + (Math.random() * 15),  // 5 <= r <= 20
        colorPicker.next(),
    );
    balls.push(newBall);
};

function eventCoordsOnElement(ev: MouseEvent, elem: HTMLElement): Vector {
    let totalOffsetX: number = 0;
    let totalOffsetY: number = 0;
    let currentElement: HTMLElement = elem;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = <HTMLElement>currentElement.offsetParent)

    const canvasX: number = ev.pageX - totalOffsetX;
    const canvasY: number = ev.pageY - totalOffsetY;

    return new Vector(canvasX, canvasY);
}

function newBallVelocity(): Vector {    
    // Pick a speed so the ball will cross the canvas in ~4 seconds
    const initialSpeed: number = (bouncyBallsCanvas.width + bouncyBallsCanvas.height) / 8;
    const splay: number = 0.5 + Math.random();  // 0.5 <= s <= 1.5
    const speed = initialSpeed * splay;
    const direction: number = Math.random() * 2 * Math.PI;

    return new Vector(
        speed * Math.cos(direction),
        speed * Math.sin(direction),    
    );
}

function animateBall(ball: Ball) {
	var deltaX = ball.velocity.X * (frameDurationMs / 1000);
    var deltaY = ball.velocity.Y * (frameDurationMs / 1000);
    // x movement and bounce
    if ((ball.position.X + deltaX - ball.radius) < 0) {
        ball.position.X = ball.radius;
        ball.velocity.X *= -1;
    }
    else if ((ball.position.X + deltaX + ball.radius) < bouncyBallsCanvas.width) {
        ball.position.X += deltaX;
    } else {
        ball.position.X = bouncyBallsCanvas.width - ball.radius;
        ball.velocity.X *= -1;
    }
    // y movement and bounce
    if ((ball.position.Y + deltaY - ball.radius) < 0) {
        ball.position.Y = ball.radius;
        ball.velocity.Y *= -1;
    }
    else if ((ball.position.Y + deltaY + ball.radius) < bouncyBallsCanvas.height) {
        ball.position.Y += deltaY;
    } else {
        ball.position.Y = bouncyBallsCanvas.height - ball.radius;
        ball.velocity.Y *= -1;
    }
}

function drawBall(ball: Ball) {
    canvasContext.beginPath();
    canvasContext.arc(
        ball.position.X,
        ball.position.Y,
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
    balls.forEach(animateBall);
    balls.forEach(drawBall);
}

const animationHandle: number = setInterval(redrawBalls, frameDurationMs);
