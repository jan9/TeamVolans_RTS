function getGold(currentGold, playerKingdom) {
  var newGold;
  newGold = currentGold;
  player.gold = currentGold;
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
      gameObject.startBuildUnit(gameObject.unitProduced, player, player.game, true);
      console.log(gameObject.type + ' is creating ' + gameObject.unitProduced);
    }
    else{
      selectedUnit = gameObject;
    }


}
