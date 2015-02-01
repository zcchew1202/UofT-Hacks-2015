//global varibles

//first index is counter for actions, second and third index has to do with the interval between actions
tempArray={
	"Hi":[0,0], //wave in, wave out: "Hi"
	"Bye":[0,0], //wave out: "Bye"
	"How":[0,0], //wave out, wave in: "How are you doing?"
	"What":[0,0], //wave in, fist: "What are your plans for the weekend?"
	"Ilu":[0,0], //wave out, fist: "I Love you?" 
	"rest":0,
	"fistRest":0
};

outputString = "";


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
            "What"
            */
            console.log(tempArray.rest)
            console.log(tempArray.What[1])
            if(tempArray.What[0] == 1 && (tempArray.rest - tempArray.What[1] <= 100)){
            	console.log("What are you plans for the weekend?");
            	outputString = "What are you plans for the weekend?"
       			tempArray.What[0] = 0;
       			tempArray.What[1] = 0;
            }

            /*
            "Ilu"
            */
            
            if(tempArray.Ilu[0] == 1 && (tempArray.rest - tempArray.Ilu[1] <= 100)){
            	console.log("I love you");
            	outputString = "I love you"
       			tempArray.Ilu[0] = 0;
       			tempArray.Ilu[1] = 0;
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
            else{
            	tempArray.Hi[1] = tempArray.rest
            }


            /*
			"What"
			*/
            if(tempArray.What[0] == 0){
            	tempArray.What[0] = tempArray.What[0] + 1
            	tempArray.What[1] = tempArray.rest	
            }
            else{
            	tempArray.What[1] = tempArray.rest
            }

            /*
           	"How"
           	*/
           	//console.log("tempArray.rest = " + tempArray.rest)
           	//console.log("tempArray.How[1] = " + tempArray.How[1])
           	if(tempArray.How[0] == 1 && (tempArray.rest - tempArray.How[1] <= 100)){
            	console.log("How are you doing?");
            	outputString = "How are you doing?"
            	tempArray.How[0] = 0;
            	tempArray.How[1] = 0;
            }



            break;

        //Wave out
        case currentPose.POSE_WAVE_OUT:
  			console.log("wave out");

  			/*
			"Bye"
  			*/
            console.log("Bye");
            outputString = "Bye"
  			

            /*
        	"Hi"
        	*/
            if(tempArray.Hi[0] == 1 && (tempArray.rest - tempArray.Hi[1] <= 100)){
            	console.log("Hi");
            	outputString = "Hi"
       			tempArray.Hi[0] = 0;
            }

            /*
            "Ilu"
            */
            if(tempArray.Ilu[0] == 0){
            	tempArray.Ilu[0] = tempArray.Ilu[0] + 1

            	tempArray.Ilu[1] = tempArray.rest
            	console.log(tempArray.Ilu[1])
            }
            else{
            	tempArray.Ilu[1] = tempArray.rest
            	console.log(tempArray.Ilu[1])
            }

            /*
			"How"
            */
            if(tempArray.How[0] == 0){
            	tempArray.How[0] = tempArray.How[0] + 1
            	tempArray.How[1] = tempArray.rest;
            }
            else{
            	tempArray.How[1] = tempArray.rest;
            }

            


            break;

        //Finger spread
        case currentPose.POSE_FINGERS_SPREAD:
           	console.log("fingers spreading");

           	
           
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
	        if(tempArray.Hi[1] < (tempArray.rest - 100)){
	        	tempArray.Hi[0] = 0;
	        }
	        if(tempArray.How[1] < (tempArray.rest - 100)){
	        	tempArray.How[1] = 0;
	        }
			if(tempArray.What[1] < (tempArray.rest - 100)){
	        	tempArray.What[1] = 0;
	        }
	        if(tempArray.Ilu[1] < (tempArray.rest - 100)){
	        	tempArray.Ilu[1] = 0;
	        }		     
            break;
    }

});