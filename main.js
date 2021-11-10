objects = [];
input_value = "";

function setup(){
    canvas = createCanvas(480, 380);
    canvas.position(700, 300);

    video = createCapture(VIDEO);
    video.hide();
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("result").innerHTML = "Status: Detecting Objects";
    document.getElementById("number-of-objects").innerHTML = "Number of objects detected are..."

    input_value = document.getElementById("input").value;

    for(i = 0; i < objects.length; i++){
        if(objects[i].label == input_value){
            document.getElementById("number-of-objects").innerHTML = input_value + " Found";
            video.stop();
            console.log("detected");
            objectDetector.detect(gotResult);
        }else{
            document.getElementById("number-of-objects").innerHTML = input_value + " Not Found";
        }
    }
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("result").innerHTML = "Status: All Objects Detected";
            document.getElementById("number-of-objects").innerHTML = "Number of objects detected are " + objects.length;

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model has been loaded");
    status = true;
}
