function spiralLocation(i){

  let coordinates = {"x": 0, "y": 0};

  if(i % 3 == 0){
    coordinates.x = (i/3) * 16 * -1;
  }
  else if(i % 2 == 0){
      coordinates.y = (i/2) * 8;
      if(i % 4 == 0){
        coordinates.y*=-1;
      }
  }
  else{
      coordinates.x = Math.round(i/2) * 8;
  }

  //1 is a special case as it is the only one that would be *right* next to the first unit
  if(i == 1){
    coordinates.x += 8;
  }

  return coordinates;
}



//calculates the distance between two points (units, structures)
//put helper function in another file
  function distance(oneX, oneY, twoX, twoY){
    xDistance = oneX - twoX;
    yDistance = oneY - twoY;

    return Math.sqrt((xDistance*xDistance) + (yDistance * yDistance));
  }
