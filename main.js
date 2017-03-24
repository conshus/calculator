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
  //let final = eval(total);
  //console.log("calculate!")
  //console.log("total: ", total);
  //console.log("final: ", final);
  display.textContent = total;
  console.log("calculationArray before clearing after calculation", calculationArray);
  calculationArray=[];
  //calculationArray=[total];
  entry = total.toString();
  console.log("entry total.toString: ", entry);
  console.log("after calculate calculationArray", calculationArray);
  //entry = "";
  //entry = total;
  //console.log(entry);
}
function addToDisplay(event) {
  let buttonPressed = event.target.textContent;
  if ((buttonPressed == "÷") || (buttonPressed == "x") || (buttonPressed == "-") || (buttonPressed == "+")){
    if (display.textContent != ""){

      if ((calculationArray[calculationArray.length-1] == "") && ((calculationArray[calculationArray.length-2] == "÷") || (calculationArray[calculationArray.length-2] == "x") || (calculationArray[calculationArray.length-2] == "-") || (calculationArray[calculationArray.length-2] == "+"))) {
        //calculationArray.splice(calculationArray.length-1,2);
        calculationArray.splice(calculationArray.length-2,2);
        console.log("double operations ", calculationArray);
      }


      calculationArray[calculationArray.length]=entry;
      calculationArray[calculationArray.length]=buttonPressed;
      entry = "";
    }
  }else if (buttonPressed == "C"){
    entry = "";
    display.textContent = "";
    calculationArray=[];
    total = 0;
    //console.log("entry cleared");
  }else if (buttonPressed == "="){
    calculationArray[calculationArray.length]=entry;
    if (display.textContent != ""){
      //calculationArray[calculationArray.length]=parseFloat(entry);
      console.log("calculationArray after = is pressed:", calculationArray);
      console.log("the last value in calculationArray: ", calculationArray[calculationArray.length-1]);
      if ((calculationArray[calculationArray.length-1] == "") && ((calculationArray[calculationArray.length-2] == "÷") || (calculationArray[calculationArray.length-2] == "x") || (calculationArray[calculationArray.length-2] == "-") || (calculationArray[calculationArray.length-2] == "+"))) {
        //calculationArray.splice(calculationArray.length-1,2);
        calculationArray.splice(calculationArray.length-2,2);
        console.log("calculationArray after splice: ", calculationArray)
        console.log("array length if last position is an operator: ", calculationArray.length);
      }
    }else if(display.textContent==""){
      console.log("display is empty and = was pressed.");
      total = 0;
      calculationArray=[0];
    }else {
      console.log("entry: ",entry);
      calculationArray[calculationArray.length]=entry;
      console.log("array length if last position is not an operator: ", calculationArray.length);
      console.log("calculationArray: ", calculationArray)
    }
    //calculationArray[calculationArray.length]=parseFloat(entry);
    if (display.textContent != ""){
      calculate();
    }
  }else {
    entry = entry + buttonPressed;
    display.textContent = entry;
    //calculationArray[calculationArray.length]=parseInt(buttonPressed);
    //calculationArray[calculationArray.length]=parseInt(entry);
    console.log("entry with no operators",entry);
  }
  //calculationArray[calculationArray.length] = buttonPressed;
  //calculationArray[calculationArray.length] = entry;
  //console.log(entry);
  //console.log(buttonPressed);
  //console.log(calculationArray);
}
let operators = ""
let calculationArray = [];
let display = document.querySelector("#answer");
let buttons = document.querySelectorAll("button");
let entry = "";
let total = 0;
for (i=0; i<buttons.length; i++){
  let button = buttons[i];
  button.addEventListener("click", addToDisplay);
}
