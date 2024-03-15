status = "";
objects = [];
alarm = "";

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(500, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video, 0, 0, 500, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video ,got_results);
        for(i = 0; i < objects.length; i++){
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML = "Status : Baby Detected";
                alarm.stop();
            }else{
                document.getElementById("status").innerHTML = "Status : No Baby Detected";
                alarm.play();
            }
            document.getElementById("number_objects").innerHTML = "Number of objects detected : "+ objects.length;
                percent = floor(objects[i].confidence*100);
                fill("red");
                text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
                noFill();
                stroke(r, g, b);
                strokeWeight(3);
                rect(objects[i].x, objects[i].y, objects[0].height, objects[0].width);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function got_results(error, result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
    }
    objects = result;
}