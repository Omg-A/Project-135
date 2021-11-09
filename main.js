function setup(){
    canvas = createCanvas(480, 380);
    canvas.position(700, 300);

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model has been loaded");
    status = true;
}