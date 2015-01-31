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
            
            break;
        case currentPose.POSE_WAVE_OUT:
            
            break;
        case currentPose.POSE_FINGERS_SPREAD:
           
            break;
        case currentPose.POSE_TWIST_IN:
            
            break;
        case currentPose.POSE_NONE:
        default:
            
            break;
    }
});