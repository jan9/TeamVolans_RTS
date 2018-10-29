function getGold(currentGold, playerKingdom) {
  var newGold;
  newGold = currentGold;
  return newGold;
}

function getPopulation(currentPopulation, playerKingdom){
  var newPop;
  newPop = currentPopulation;
  return newPop;
}

function onObjectClicked(pointer,gameObject)
{
  console.log("Selected: " +gameObject.type);
    if(gameObject.baseType === "Structure"){
      gameObject.startBuildUnit(gameObject.unitProduced, player, player.game);
      console.log(gameObject.type + ' is creating ' + gameObject.unitProduced);
    }


}
