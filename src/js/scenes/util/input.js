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
    if(gameObject.baseType === "Structure"){
      gameObject.startBuildUnit(gameObject.unitProduced, player, player.game);
    }
}
