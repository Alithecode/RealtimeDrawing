noseX =0;
noseY=0;
difference = 0;
rightWristX =0;
leftWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(560,500);
    video.position(100,100);
    canvas= createCanvas(450,450);
    canvas.position(770, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " +noseX+ "noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + " rightWristX = " + rightWristX + " difference = " +difference);
    }
}

function draw(){
    background('#4587ad');
    document.getElementById("square_side").innerHTML = "Width and Height of the square will be = " +difference +" px";
    fill('rgb(250, 3, 3)');
    stroke('rgb(12, 8, 8)');
    square(noseX, noseY, difference);
}