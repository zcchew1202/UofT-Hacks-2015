//global varibles

//sentences that are temp
simpleSentences = function (){

  var sentenceArr = ["Hi", "Bye", "How are you doing?", "What are your plans for today?", "What's up?"]
  
  return sentenceArr;
};


//first index is counter for actions, second and third index has to do with the interval between actions
tempArray={
	"Hi":[0,0], //wave in, wave out: "Hi"
	"Bye":[0,0], //wave out: "Bye"
	"How":[0,0], //fist, fingers spread: "How are you doing?"
	"What":[0,0], //wave in, fist: "What are your plans for the weekend?"
	"Ilu":[0,0], //wave out, fist: "I Love you?" 
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
    	//Fist
        case currentPose.POSE_FIST:
            console.log("fist");

            /*
			"How"
            */
            if(tempArray.How[0] == 0){
            	tempArray.How[0] = tempArray.How[0] + 1
            	tempArray.Ho1[1] = tempArray.rest
            }

            /*
            "Whats"
            */
            if(tempArray.What[0] == 1 && (tempArray.rest - tempArray.What[1] <= 35)){
            	console.log("What are you plans for the weekend?");
       			tempArray.What[0] = 0;
            }

            /*
            "Ilu"
            */
            if(tempArray.Ilu[0] == 1 && (tempArray.rest - tempArray.Ilu[1] <= 35)){
            	console.log("I love you");
       			tempArray.Ilu[0] = 0;
            }
            break;

        //Wave in
        case currentPose.POSE_WAVE_IN:
            console.log("wave in");

            /*
			"Hi"
			*/
            if(tempArray.Hi[0] == 0){
            	tempArray.Hi[0] = tempArray.Hi[0] + 1
            	tempArray.Hi[1] = tempArray.rest	
            }

            /*
			"What"
			*/
            if(tempArray.What[0] == 0){
            	tempArray.What[0] = tempArray.What[0] + 1
            	tempArray.What[1] = tempArray.rest	
            }

            break;

        //Wave out
        case currentPose.POSE_WAVE_OUT:
  			console.log("wave out");
  			/*
			"Bye"
  			*/
            if(tempArray.Hi[0] == 0){
            	console.log("Bye");
            }

            /*
        	"Hi"
        	*/
            if(tempArray.Hi[0] == 1 && (tempArray.rest - tempArray.Hi[1] <= 35)){
            	console.log("Hi");
       			tempArray.Hi[0] = 0;
            }

            /*
            "Ilu"
            */
            if(tempArray.Ilu[0] == 0){
            	tempArray.Ilu[0] = tempArray.Ilu[0] + 1
            	tempArray.Ilu[1] = tempArray.rest	
            }


            break;

        //Finger spread
        case currentPose.POSE_FINGERS_SPREAD:
           	console.log("fingers spreading");

           	/*
           	"How"
           	*/
           	if(tempArray.How[0] == 1 && (tempArray.rest - tempArray.How[1] <= 35)){
            	console.log("How are you doing?");
            	tempArray.How[0] = 0;
            }
           
            break;

        //Twist in
        case currentPose.POSE_TWIST_IN:
            console.log("twist in");
            break;


        //Nothing
        case currentPose.POSE_NONE:
        default:
	        //console.log("rest")
	        tempArray.rest = tempArray.rest + 1;


	        /*
	        Check times in all sentence objects and if later than a 35 count, reduce them to zero
	        */
	        if(tempArray.Hi[1] < (tempArray.rest - 35)){
	        	tempArray.Hi[0] = 0;
	        }
	        if(tempArray.How[1] < (tempArray.rest - 35)){
	        	tempArray.How[1] = 0;
	        }
			if(tempArray.What[1] < (tempArray.rest - 35)){
	        	tempArray.What[1] = 0;
	        }
	        if(tempArray.Ilu[1] < (tempArray.rest - 35)){
	        	tempArray.Ilu[1] = 0;
	        }		     
            break;
    }

});