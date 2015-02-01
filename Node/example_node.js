//global varibles

//sentences that are temp
simpleSentences = function (){

  var sentenceArr = ["Hi", "Bye", "How are you doing?", "What are your plans for today?", "What's up?"]
  
  return sentenceArr;
};


//first index is counter for actions, second and third index has to do with the interval between actions
tempArray={
	"Hi":[0,0,0], //wave in, wave out: "Hi"
	"Bye":[0,0,0], //wave out: "Bye"
	"How":[0,0,0], //fist, fingers spread: "How are you doing?"
	"What":[0,0,0], //wave in, fist: "What are your plans for today?"
	"Whats":[0,0,0], //wave out, fist: "What's up?" 
	"rest":0
};


//myo connection
var Myo = require('../template/entry'),
    hub = new Myo.Hub();

hub.on('ready', function() { console.log('ready'); });
hub.on('connect', function() { console.log('connected'); });
hub.on('disconnect', function() { console.log('disconnect'); });
hub.on('frame', function(frame) {
    //console.dir(frame);

    //if (frame.rotation) {
    //    console.log(frame.rotation.toString());
    //}

    //if (frame.pose && frame.pose.valid) {
    //    console.log(frame.pose.toString());
    //}
    
});
hub.on('pose', function(pose) {
    currentPose = pose;
    
    switch(currentPose.type) {
        case currentPose.POSE_FIST:
            console.log("i am making a fist");
            if(tempArray.Hi[0] == 0){
            	tempArray.Hi[0] = tempArray.Hi[0] + 1	
            }
            if(tempArray.How[0] == 0){
            	tempArray.How[0] = tempArray.How[0] + 1	
            }
            break;
        case currentPose.POSE_WAVE_IN:
            console.log("i am making a wave in");
            if(tempArray.Hi[0] == 0){
            	tempArray.Hi[0] = tempArray.Hi[0] + 1
            	tempArray.Hi[1] = tempArray.rest	
            	//console.log(tempArray.Hi[0]);
            }
            break;
        case currentPose.POSE_WAVE_OUT:
        	tempArray.Hi[2] = tempArray.rest;
        	//console.log("tempArray.Hi[2] = " + tempArray.Hi[2] + " tempArray.Hi[1] = " + tempArray.Hi[1]);
        	//console.log(tempArray.Hi[2] - tempArray.Hi[1]);
            console.log("i am making a wave out");
            if(tempArray.Hi[0] == 0){
            	console.log("Bye");
            }
            if(tempArray.Hi[0] == 1 && (tempArray.Hi[2] - tempArray.Hi[1] <= 35)){
            	console.log("Hi");
       			tempArray.Hi[0] = 0;
       			console.log(tempArray.Hi[0]);
            }
            break;
        case currentPose.POSE_FINGERS_SPREAD:
           	console.log("i am making a fingers spreading motion");
           	if(tempArray.How[0] == 1){
            	console.log("How are you doing?");
            	tempArray.How[0] = 0;
            }
           
            break;
        case currentPose.POSE_TWIST_IN:
            console.log("i am making a twist in");
            break;
        case currentPose.POSE_NONE:
        default:
	        //console.log("rest")
	        tempArray.rest = tempArray.rest + 1;
	        if(tempArray.Hi[1] < (tempArray.rest - 35)){
	        	tempArray.Hi[0] = 0;
	        }
	        //console.log(tempArray.Hi);
            break;
    }

});