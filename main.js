/*
√ Perform math on two single digit integers
√ Make the numbers and calculations appear on the calculator display
√ A decimal point
√ A "clear" that clears the output area and the memory of the math being performed
√ A button to flip between positive and negative
√ Allow more than one operator to be entered in a single go and respect order of operations when calculating.
*/
function orderOfOperations() {
  let calculationArray = enteredArray;
  let subEquationResult = 0;
  let operationIndex = 0;
  while (calculationArray.length > 1){
    let divideIndex = calculationArray.indexOf("÷");
    let multIndex = calculationArray.indexOf("x");
    let addIndex = calculationArray.indexOf("+");
    let subtractIndex = calculationArray.indexOf("-");
    if (( divideIndex != -1) || (multIndex != -1)) {
      //get the min index to go from left to right
      if (divideIndex == -1){
        divideIndex = calculationArray.length+1;
      }
      if (multIndex == -1){
        multIndex = calculationArray.length+1;
      }
      operationIndex = Math.min(divideIndex,multIndex);
    } else if ((addIndex != -1) || (subtractIndex != -1)) {
      //get the min index to go from left to right
      if (addIndex == -1){
        addIndex = calculationArray.length+1;
      }
      if (subtractIndex == -1){
        subtractIndex = calculationArray.length+1;
      }
      operationIndex = Math.min(addIndex,subtractIndex);
    }
    subEquationResult = calculate(calculationArray[operationIndex-1],calculationArray[operationIndex],calculationArray[operationIndex+1]);
    calculationArray.splice(operationIndex-1,3,subEquationResult);
  }
  result.textContent = calculationArray[0];
  entry = calculationArray[0].toString();
  enteredArray=[];
}
function calculate(left, operator, right){
  let leftNumber = parseFloat(left);
  let rightNumber = parseFloat(right);
  if (operator == "+"){
    return leftNumber + rightNumber;
  } else if (operator == "-"){
    return leftNumber - rightNumber;
  } else if (operator == "x"){
    return leftNumber * rightNumber;
  } else if (operator == "÷"){
    return leftNumber / rightNumber;
  }
}
function updateScreen() {
  for (i = 0; i < enteredArray.length; i++){
    display.textContent = display.textContent + enteredArray[i];
  }
}
function addToDisplay(event) {
  let buttonPressed = event.target.textContent;
  if (operators.indexOf(buttonPressed) == -1){
    if (entry == ""){
      entry = buttonPressed;
    }else{
    entry = entry + buttonPressed;
    }
    display.textContent = entry;
  } else if (buttonPressed == "C"){
    entry = "";
    display.textContent = "";
    result.textContent = "";
    enteredArray = [];
  } else if (buttonPressed == "+/-"){
    if ((operators.indexOf(entry) == -1) && (entry != "")){
      entry = parseFloat(entry)*-1;
      result.textContent = entry;
    }
  } else if (buttonPressed == "="){
    enteredArray[enteredArray.length] = entry;
    if ((entry == "")){
      enteredArray.splice(enteredArray.length-2,2);
    }
    orderOfOperations();
  } else {
    if (display.textContent != ""){
      if (entry != "" ){
      enteredArray[enteredArray.length] = entry;
      }
      entry="";
      //Check to see if the last element in array is an operator
      if (operators.indexOf(enteredArray[enteredArray.length-1])!= -1){
        enteredArray[enteredArray.length-1] = buttonPressed;
      }else{
        enteredArray[enteredArray.length] = buttonPressed;
      }
      display.textContent = buttonPressed;
    }
  }
}
let operators = ["(",")","÷","x","+","-","=","C","+/-"];
let enteredArray = [];
let display = document.querySelector("#answer");
let result = document.querySelector("#result");
let buttons = document.querySelectorAll("button");
let entry = "";
let total = 0;
for (i=0; i<buttons.length; i++){
  let button = buttons[i];
  button.addEventListener("click", addToDisplay);
}
