const _unitList = ["Archer", "Swordsman", "Catapult", "Priest", "Miner", "Villager", "Royalty"];
const _buildingList = ["Archery Range", "Barracks", "Machinery", "Temple", "Mine", "Town Center", "Castle"];
const _goldDepositsNum = 2;
const _maxStructW = 100;
const _maxStructH = 100;

//attack ranges - unit sprite is 32 size so each range is 1 unit distance (+ a little wiggle room of 4 pixels)
const _attackRangeOne = 36;
const _attackRangeTwo = 70;
const _attackRangeThree = 102;

const _options = [{"key": "T", "name": "travel"}, {"key": "B", "name": "build"},
{"key": "F", "name": "fight"}, {"key": "C", "name": "create"},
{"key": "M", "name": "mine"}, {"key": "R", "name": "royalty"},{"key": "N", "name": "none"}];
