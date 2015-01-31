//global varibles

//sentences that are temp
simpleSentences = function (){

  var sentenceArr = ["Hi", "Bye", "How are you doing?", "What are your plans for today?", "What's up?"]
  
  return sentenceArr;
};


tempArray={
	"Hi":0,
	"Bye":0,
	"How are you doing?":0,
	"What are your plans for today?":0,
	"What's up?":0
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
            break;
        case currentPose.POSE_WAVE_IN:
            console.log("i am making a wave in");
            if(tempArray.Hi == 0){
            	tempArray.Hi = tempArray.Hi + 1	
            }
            console.log(tempArray.Hi);
            break;
        case currentPose.POSE_WAVE_OUT:
            console.log("i am making a wave out");
            if(tempArray.Hi == 1){
            	tempArray.Hi = tempArray.Hi + 1
            }
            console.log(tempArray.Hi);
            if(tempArray.Hi == 2){
            	console.log("Hi");
       			tempArray.Hi = 0;
            }
            break;
        case currentPose.POSE_FINGERS_SPREAD:
           	console.log("i am making a wave in");
            break;
        case currentPose.POSE_TWIST_IN:
            console.log("i am making a twist in");
            break;
        case currentPose.POSE_NONE:
        default:
	        if(tempArray.Hi == 2){
	    		tempArray.Hi = 0;
	        }
	        //console.log(tempArray.Hi);
            break;
    }

});