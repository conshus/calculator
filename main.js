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
  console.log("calculationArray at the start: ",calculationArray);
  console.log("order of operations function");
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
      //subEquationResult = calculate(calculationArray[operationIndex-1],calculationArray[operationIndex],calculationArray[operationIndex+1]);
      //calculationArray.splice(operationIndex-1,3,subEquationResult);
      //console.log("÷ position: ", divideIndex);
      //console.log("x position: ", multIndex);
      //console.log("operationIndex: ", operationIndex);
      //console.log("subEquationResult: ", subEquationResult);
      //console.log("new calculationArray: ", calculationArray);
      //subEquationResult = calculate()
    } else if ((addIndex != -1) || (subtractIndex != -1)) {
      //get the min index to go from left to right
      if (addIndex == -1){
        addIndex = calculationArray.length+1;
      }
      if (subtractIndex == -1){
        subtractIndex = calculationArray.length+1;
      }
      operationIndex = Math.min(addIndex,subtractIndex);
      //subEquationResult = calculate(calculationArray[operationIndex-1],calculationArray[operationIndex],calculationArray[operationIndex+1]);
      //calculationArray.splice(operationIndex-1,3,subEquationResult);
      //console.log("+ position: ", addIndex);
      //console.log("- position: ", subtractIndex);
      //console.log("operationIndex: ", operationIndex);
      //console.log("subEquationResult: ", subEquationResult);
      console.log("new calculationArray: ", calculationArray);
    }
    subEquationResult = calculate(calculationArray[operationIndex-1],calculationArray[operationIndex],calculationArray[operationIndex+1]);
    calculationArray.splice(operationIndex-1,3,subEquationResult);
    console.log("new calculationArray: ", calculationArray);
  }
  result.textContent = calculationArray[0];
  entry = calculationArray[0].toString();
  enteredArray=[];
  //calculate();
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
/*function calculate() {
  total = 0;
  console.log("calculationArray right after calculate fn", calculationArray);
  for (i=0; i < calculationArray.length; i++) {
    if (calculationArray[i] == "+"){
      total = total + parseFloat(calculationArray[i+1]);
      i++;
    } else if (calculationArray[i] == "-"){
      total = total - parseFloat(calculationArray[i+1]);
      i++;
    } else if (calculationArray[i] == "x"){
      total = total * parseFloat(calculationArray[i+1]);
      i++;
    } else if (calculationArray[i] == "÷"){
      total = total / parseFloat(calculationArray[i+1]);
      i++;
    }
    else {
      total = total + parseFloat(calculationArray[i]);
    }
  }
  //display.textContent = total;
  result.textContent = total;
  console.log("calculationArray before clearing after calculation", calculationArray);
  calculationArray=[];
  entry = total.toString();
  console.log("entry total.toString: ", entry);
  console.log("after calculate calculationArray", calculationArray);
}*/
function updateScreen() {
  for (i = 0; i < enteredArray.length; i++){
    display.textContent = display.textContent + enteredArray[i];
    console.log("display updated: ",enteredArray);
  }
}
function addToDisplay(event) {
  let buttonPressed = event.target.textContent;

  console.log('button Pressed: ', buttonPressed);
  console.log(operators.indexOf(buttonPressed));
  if (operators.indexOf(buttonPressed) == -1){
    if (entry == ""){
      entry = buttonPressed;
    }else{
    entry = entry + buttonPressed;
    }
    display.textContent = entry;
    console.log("entry: ", entry);
  } else if (buttonPressed == "C"){
    console.log("cleared!");
    entry = "";
    display.textContent = "";
    result.textContent = "";
    enteredArray = [];
  } else if (buttonPressed == "+/-"){
    console.log("toggle positive and negative");
    if ((operators.indexOf(entry) == -1) && (entry != "")){
      entry = parseFloat(entry)*-1;
      console.log (entry);
      display.textContent = entry;
    }
  } else if (buttonPressed == "="){
    console.log("calculate");
    console.log("last element in enteredArray before calculaton: ",enteredArray[enteredArray.length-1]);
    console.log("entry before adding: ",entry);
    enteredArray[enteredArray.length] = entry;
    //if ((operators.indexOf(calculationArray[calculationArray.length-1]) != -1) || (entry == "")){
    if ((entry == "")){
      enteredArray.splice(enteredArray.length-2,2);
      console.log("enteredArray after splice: ",enteredArray);
    }
    orderOfOperations();
    //calculate();
  } else {
    if (display.textContent != ""){
      if (entry != "" ){
      enteredArray[enteredArray.length] = entry;
      }
      entry="";
      console.log("enteredArray after operator", enteredArray);
      //Check to see if the last element in array is an operator
      if (operators.indexOf(enteredArray[enteredArray.length-1])!= -1){
        console.log("last element in array: ",enteredArray[enteredArray.length-1]);
        enteredArray[enteredArray.length-1] = buttonPressed;
        console.log("double operator", enteredArray);
      }else{
        enteredArray[enteredArray.length] = buttonPressed;
        console.log("enteredArray after operator", enteredArray);
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
