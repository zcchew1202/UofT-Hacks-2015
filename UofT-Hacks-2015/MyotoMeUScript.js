var simpleSentences_withColor = function (sentenceNum)
{


  var sentenceArr = ["Hi", "Bye"]
  
  return sentenceArr[sentenceNum];
}


var color = function (currentAngle)
{

  var const refAngle = 0;
  var angleDiff = currentAngle - refAngle;

  var negativeColor = ["00FFC8", "00FF11", "62FF00", "9DFF00", "F6FF00", "FFC400", "FF9500", "FF6200","E83F07", "E81D07"]; //array of colors which correspond to negative angleDiff
  var positiveColor = ["00FFC8","079DE8", "074AE8", "070EE8", "4707E8", "9207E8", "E807D9", "E807BB", "E8076C", "E81D07"]; //array of colors which correspond to postive angleDiff
  var sensitivityMultiplier = 1;
  //set a const for the ref color/neutral color & the starting angle of the fist->e.g blue at 0 rad
  //take the difference between current angle & starting angle (current - starting)
 //add this difference * sensitivityMultiplier to  current array index...
  //


  if(angleDiff < 0)
    {
      return negativeColor[Math.round(angleDiff * 10) * sensitivityMultiplier % negativeColor.length];//make sure it doesn't go over upper bound of array & * 100 to give a bigger range of colors


    }
  else

    return positiveColor[Math.round(angleDiff * 10) * sensitivityMultiplier % positiveColor.length];//make sure it doesn't go over upper bound of array & * 100 to give a bigger range of colors




}
