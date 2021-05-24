/*
    var weapOwned = [];
    var armOwned = [];
    var shieldOwned = [];
    var charOwned = []; 

    charOwned = {{{json charOwned}}};
    armOwned = {{{json armOwned}}};
    shieldOwned = {{{json shieldOwned}}};
    weapOwned = {{{json weapOwned}}};

    var charNames = ["Aaron", "Rickjaw", "Shua", "Cram", "Rog"];
    var weaponNames = ["Short Sword", "Wooden Bow", "Warhammer", "Nurse's Claymore", "Death's Arm"];
    var shieldNames = ["Wooden Plate", "Spiked Guard", "Ivy Shield", "Iron Buckler", "Medusa"];
    var armorNames = ["Leather Tunic", "Chainmail", "Knight's Armor", "Uniqlo", "Iron Suit"];

    var types = ["Character","Weapon","Shield","Armor"];
    var currChar = 0, currWeapon = 0, currShield = 0; currArmor = 0, slot = 0;
*/

function post(){
  alert("Posted in forum!");
}
function accept(){
  alert("Trade Accepted!");
}
var tslot = 1;
function plus(){
  if(tslot==1){
    document.getElementById("cont2").style.height = "100px";
    document.getElementById("cont2").style.marginTop = "15px";
    tslot++;
  }
  else if(tslot == 2){
    document.getElementById("cont3").style.height = "100px";
    document.getElementById("cont3").style.marginTop = "15px";
    tslot++;
  }
  else if(tslot == 3){
    document.getElementById("cont4").style.height = "100px";
    document.getElementById("cont4").style.marginTop = "15px";
    tslot = 0;
  }
  else if(tslot == 0){
    document.getElementById("cont2").style.height = 0;
    document.getElementById("cont2").style.marginTop = 0;
    document.getElementById("cont3").style.height = 0;
    document.getElementById("cont3").style.marginTop = 0;
    document.getElementById("cont4").style.height = 0;
    document.getElementById("cont4").style.marginTop = 0;
    tslot++;
  }
}
var weapOwned = [];
var armOwned = [];
var shieldOwned = [];
var charOwned = [];  

var charNames = ["Aaron", "Rickjaw", "Shua", "Cram", "Rog"];
var weaponNames = ["Short Sword", "Wooden Bow", "Warhammer", "Nurse's Claymore", "Death's Arm"];
var shieldNames = ["Wooden Plate", "Spiked Guard", "Ivy Shield", "Iron Buckler", "Medusa"];
var armorNames = ["Leather Tunic", "Chainmail", "Knight's Armor", "Uniqlo", "Iron Suit"];
var types = ["Character","Weapon","Shield","Armor"];
//0 - char, 1 - weap, 2 - shield 3 - armor
var currChar = 0, currWeapon = 0, currShield = 0, currArmor = 0, slot=0;
function changeSlot(order){
  if (order == 1) {
    if (slot != 3) slot += 1;
    else slot = 0;
  }
  else {
    if (slot != 0) slot -= 1;
    else slot = 3;
  }
  document.getElementById("slotname1").innerHTML = types[slot];
  if(slot == 0){
    changeCharName();
  }
  else if (slot == 1){
    changeWeapName();
  }
  else if (slot == 2){
    changeShiName();
  }
  else {
    changeArmName();
  }
}

function changeCharName (){
    document.getElementById("name1").innerHTML = charNames[charOwned[currChar]];
    document.getElementById("toTrade").value = charNames[charOwned[currChar]];
    document.getElementById("itemType").value = slot;
    document.getElementById("itemIndex").value = charOwned[currChar];
}
function changeWeapName (){
    document.getElementById("name1").innerHTML = weaponNames[weapOwned[currWeapon]];
    document.getElementById("toTrade").value = weaponNames[weapOwned[currWeapon]];
    document.getElementById("itemType").value = slot;
    document.getElementById("itemIndex").value = weapOwned[currWeapon];
}
function changeShiName (){
    document.getElementById("name1").innerHTML = shieldNames[shieldOwned[currShield]];
    document.getElementById("toTrade").value = shieldNames[shieldOwned[currShield]];
    document.getElementById("itemType").value = slot;
    document.getElementById("itemIndex").value = shieldOwned[currShield];
}
function changeArmName (){
    document.getElementById("name1").innerHTML = armorNames[armOwned[currArmor]];
    document.getElementById("toTrade").value = armorNames[armOwned[currArmor]];
    document.getElementById("itemType").value = slot;
    document.getElementById("itemIndex").value = armOwned[currArmor];
}

function loadoutChange(order) {
  switch (slot) {
    case 0:
      if (order == 1) {
        if (currChar != charOwned.length - 1) currChar += 1;
        else currChar = 0;
      }
      else {
        if (currChar != 0) currChar -= 1;
        else currChar = charOwned.length - 1;
      }
      changeCharName();
      break;
    case 1:
      if (order == 1) {
        if (currWeapon != weapOwned.length - 1) currWeapon += 1;
        else currWeapon = 0;
      }
      else {
        if (currWeapon != 0) currWeapon -= 1;
        else currWeapon = weapOwned.length - 1;
      }
      changeWeapName();
      break;
    case 2:
      if (order == 1) {
        if (currShield != shieldOwned.length - 1) currShield += 1;
        else currShield = 0;
      }
      else {
        if (currShield != 0) currShield -= 1;
        else currShield = shieldOwned.length - 1;
      }
      changeShiName();
      break;
    case 3:
      if (order == 1) {
        if (currArmor != armOwned.length - 1) currArmor += 1;
        else currArmor = 0;
      }
      else {
        if (currArmor != 0) currArmor -= 1;
        else currArmor = armOwned.length - 1;
      }
      changeArmName();
      break;
  }
}

