/*
√ Perform math on two single digit integers
√ Make the numbers and calculations appear on the calculator display
√ A decimal point
√ A "clear" that clears the output area and the memory of the math being performed
√ A button to flip between positive and negative
*/
function calculate() {
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
  display.textContent = total;
  console.log("calculationArray before clearing after calculation", calculationArray);
  calculationArray=[];
  entry = total.toString();
  console.log("entry total.toString: ", entry);
  console.log("after calculate calculationArray", calculationArray);
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
  } else if (buttonPressed == "+/-"){
    console.log("toggle positive and negative");
    if ((operators.indexOf(entry) == -1) && (entry != "")){
      entry = parseFloat(entry)*-1;
      console.log (entry);
      display.textContent = entry;
    }

  } else if (buttonPressed == "="){
    console.log("calculate");
    calculationArray[calculationArray.length]=entry;
    calculate();
  } else {
    if (display.textContent != ""){
      if (entry != "" ){
      calculationArray[calculationArray.length]=entry;
      }
      entry="";
      console.log("calculationArray after operator", calculationArray);
      //Check to see if the last element in array is an operator
      if (operators.indexOf(calculationArray[calculationArray.length-1])!= -1){
        console.log("last element in array: ",calculationArray[calculationArray.length-1]);
        calculationArray[calculationArray.length-1]=buttonPressed;
        console.log("double operator", calculationArray);
      }else{
        calculationArray[calculationArray.length]=buttonPressed;
        console.log("calculationArray after operator", calculationArray);
      }
      display.textContent = buttonPressed;
    }
  }
}
let operators = ["(",")","÷","x","+","-","=","C","+/-"];
let calculationArray = [];
let display = document.querySelector("#answer");
let buttons = document.querySelectorAll("button");
let entry = "";
let total = 0;
for (i=0; i<buttons.length; i++){
  let button = buttons[i];
  button.addEventListener("click", addToDisplay);
}
