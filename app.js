var canvas = document.getElementById("myCanvas");
var context;

var numA = 20, numB = 20, numC = 20;
var radiusA = 5; radiusB = 7; radiusC = 9;
var massA = 2, massB = 4, massC = 6;
var numBalls = 0;
var countA = 0, countB = 0, countC = 0;

var timeInterval = 1000/40;
var timePassed = 0;
var vxSpeed = Math.random()*5;
var hgt = 80;
var gap = 150;

if (canvas.getContext) {
    context = canvas.getContext("2d");
}

function startSimulation(){
    var options = {};
    options.benzene = {};
    options.dich ={};
    options.acetone = {};

    options.acetone.particles = document.getElementById("acetone-particles").value;
    options.acetone.size = document.getElementById("acetone-size").value;
    options.acetone.mass = document.getElementById("acetone-mass").value;
    numA = parseInt(options.acetone.particles);
    radiusA = parseInt(options.acetone.size);
    massA = parseInt(options.acetone.mass);

    options.benzene.particles = document.getElementById("benzene-particles").value;
    options.benzene.size = document.getElementById("benzene-size").value;
    options.benzene.mass = document.getElementById("benzene-mass").value;
    numB = parseInt(options.benzene.particles);
    radiusB = parseInt(options.benzene.size);
    massB = parseInt(options.benzene.mass);

    options.dich.particles = document.getElementById("dich-particles").value;
    options.dich.size = document.getElementById("dich-size").value;
    options.dich.mass = document.getElementById("dich-mass").value;
    numC = parseInt(options.dich.particles);
    radiusC = parseInt(options.dich.size);
    massC = parseInt(options.dich.mass);

    console.log(options);
    init();
}

function init() {
    balls = new Array();

    for (var m = 0; m < 50; m++){
        var ball = new Ball ("inert");
        console.log(ball);
        ball.vx = vxSpeed;
        ball.x = ball.radius+1;
        ball.vy = Math.random()*5;
        ball.y = (Math.random()*150);
        ball.draw(context);
        balls.push(ball);
    }
    numBalls += 50;
    setInterval(onEachStep, timeInterval); // 60 fps
}

function onEachStep() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    timePassed += timeInterval;
    if (timePassed == 2000){
        numBalls += (numA + numB + numC);

        for (var i = 0; i < numA; i++) {
            var ballA = new Ball("A");
            console.log(ballA);
            ballA.radius = radiusA;
            ballA.mass = massA;
            ballA.vx = vxSpeed;
            ballA.y = Math.random()*100+ballA.radius;
            ballA.vy = (Math.random() - 0.5) * 5;
            ballA.draw(context);
            balls.push(ballA);
        }
        for (var j = 0; j < numB; j++){
            var ballB = new Ball("B");
            console.log(ballB);
            ballB.radius = radiusB;
            ballB.mass = massB;
            ballB.vx = vxSpeed;
            //allB.x = Math.random()*600+10;
            ballB.y = Math.random()*100+10;
            //  ballB.vx = Math.random() * 5;
            ballB.vy = (Math.random() - 0.5) * 5;
            ballB.draw(context);
            balls.push(ballB);
        }
        for (var k = 0; k < numC; k++){
            var ballC = new Ball("C");
            console.log(ballC);
            ballC.radius = radiusC;
            ballC.mass = massC;
            ballC.vx = vxSpeed;
            // ballC.x = Math.random()*600+10;
            ballC.y = Math.random()*100+10;
            // ballC.vx = Math.random() * 5;
            ballC.vy = (Math.random() - 0.5) * 5;
            ballC.draw(context);
            balls.push(ballC);
        }
    }
    if (timePassed % 10 == 0) {
        for (var counter = 0; counter < 2; counter++) {
            var ball = new Ball("inert");
            numBalls++;
            console.log(ball);
            ball.color = "#000000";
            ball.radius = 5;
            ball.x = ball.radius+1;
            ball.y = Math.random() * 100 + 10;
            ball.vx = Math.random() * 5;
            ball.vy = Math.random()  * 5;
            ball.draw(context);
            balls.push(ball);
        }
    }
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ball.x += ball.vx;
        ball.y += ball.vy;

        /* if (ball.y >= canvas.height - ball.radius) {
             //ball.y = canvas.height - radius;
             ball.vy *= -1;
         }
         if (ball.x >= canvas.width - ball.radius) {
             //  ball.x = canvas.width + radius;
             ball.vx *= -1;
         }
         if (ball.y <= ball.radius+1){
             ball.vy *= -1;
         }
         if (ball.x <= ball.radius){
             ball.vx *= -1;
         }*/

        /*if (ball.y >= hgt - ball.radius) {      //past bottom border, then rebounds
            //ball.y = canvas.height - radius;
            ball.vy *= -1;
        }
        if (ball.x >= canvas.width - ball.radius) {   //past right border, go to next line
            //  ball.x = canvas.width + radius;
            //ball.vx *= -1;
            if ((hgt*2 + gap*2) > ball.y ) {
                ball.x = ball.radius + 1;
                ball.y += (hgt + gap);
            }
            else if((hgt*2 + gap*2) <= ball.y && (hgt*3 + gap*2) >= ball.y ) ball.count++;
        }
        if (ball.y <= ball.radius+1){            //past top border, rebound
            ball.vy *= -1;
        }*/
        if (ball.rowNumber == 1) {
            if (ball.y >= hgt + ball.radius) {      //past bottom border, then rebounds
                if (ball.vy > 0)
                    ball.vy *= -1;
            }
            else if (ball.y <= ball.radius){            //past top border, rebound
                if (ball.vy < 0)
                    ball.vy *= -1;
            }
        }
        else if (ball.rowNumber == 2){
            if (ball.y >= ball.rowNumber*hgt + gap + ball.radius){
                if (ball.vy > 0)
                    ball.vy *= -1;
            }
            else if (ball.y <= hgt+gap - ball.radius){
                if (ball.vy < 0)
                    ball.vy*=-1;
            }
        }
        else if (ball.rowNumber == 3){
            if (ball.y >= ball.rowNumber*hgt + (ball.rowNumber-1) * gap - ball.radius){
                if (ball.vy > 0)
                    ball.vy *= -1;
            }
            else if (ball.y <= 2*hgt + 2 * gap + ball.radius){
                if (ball.vy < 0)
                    ball.vy *= -1;
            }
        }
        if (ball.x >= canvas.width - ball.radius) {   //past right border, go to next line
            //  ball.x = canvas.width + radius;
            //ball.vx *= -1;
            if (ball.rowNumber < 3){
                ball.y += (hgt + gap);
                ball.x = ball.radius + 1;
                ball.rowNumber++;
            }
            else if(ball.rowNumber == 3){
                if(ball.name == "A") countA++;
                else if(ball.name = "B") countB++;
                else if(ball.name = "C") countC++;
                if (i > -1) {
                    balls.splice(i, 1);
                }
            }

            /*if ((hgt*2 + gap*2) > ball.y ) {
            }*/
            // else if((hgt*2 + gap*2) <= ball.y && (hgt*3 + gap*2) >= ball.y ) ball.count++;
        }

        ball.draw(context);
    }
    for(var k=0; k < balls.length-1; k++){
        for(var j=k+1; j<balls.length; j++)
            if(length (balls[k], balls[j]) <= (balls[k].radius + balls[j].radius)) {
                afterCollision(balls[k], balls[j]);
            }
    }
}

function length(b1, b2){
    var squareDistance = Math.pow((b1.x-b2.x), 2) + Math.pow((b1.y-b2.y), 2);
    return Math.sqrt(squareDistance);
};

function afterCollision(b1, b2) {
    temp_vx = b1.vx;
    b1.vx = b2.vx;
    b2.vx = temp_vx;
    temp_vy = b1.vy;
    b1.vy = b2.vy;
    b2.vy = temp_vy;

    var factor = 0.5;
    b1.x = b1.x + b1.vx * factor;
    b1.y = b1.y + b1.vy * factor;
    b2.x = b2.x + b2.vx * factor;
    b2.y = b2.y + b2.vy * factor;

    if (b1.y >= canvas.height - b1.radius) b1.vy *= -1;
    if (b2.y >= canvas.height - b2.radius) b2.vy *= -1;
    if (b1.x >= canvas.width - b1.radius) b1.vx *= -1;
    if (b2.x >= canvas.width - b2.radius) b2.vx *= -1;
    if (b1.y <= b1.radius+1) b1.vy *= -1;
    if (b2.y <= b2.radius+1) b2.vy *= -1;
    if (b1.x <= b1.radius) b1.vx *= -1;
    if (b2.x <= b2.radius) b2.vx *= -1;
    b1.draw(context);
    b2.draw(context);

}









