function calculate() {
  for (i=0; i < calculationArray.length; i++) {
    if (calculationArray[i] == "+"){
      total = total + calculationArray[i+1];
      i++;
    } else if (calculationArray[i] == "-"){
      total = total - calculationArray[i+1];
      i++;
    } else if (calculationArray[i] == "x"){
      total = total * calculationArray[i+1];
      i++;
    } else if (calculationArray[i] == "÷"){
      total = total / calculationArray[i+1];
      i++;
    }
    else {
      total = total + calculationArray[i];
    }
  }
  //let final = eval(total);
  //console.log("calculate!")
  //console.log("total: ", total);
  //console.log("final: ", final);
  display.textContent = total;
}
function addToDisplay(event) {
  let buttonPressed = event.target.textContent;
  if ((buttonPressed == "÷") || (buttonPressed == "x") || (buttonPressed == "-") || (buttonPressed == "+")){
    if (display.textContent != ""){
      calculationArray[calculationArray.length]=parseInt(entry);
      calculationArray[calculationArray.length]=buttonPressed;
      entry = "";
    }
  }else if (buttonPressed == "C"){
    entry = "";
    display.textContent = "";
    calculationArray=[];
    total = 0;
    //console.log("entry cleared");
  }else if (buttonPressed == "."){
    buttonPressed = "0"+buttonPressed+"0";
    console.log(". pressed", buttonPressed);
  }else if (buttonPressed == "="){
    //console.log(calculationArray[calculationArray.length-1]);
    if ((calculationArray[calculationArray.length] == "÷") || (calculationArray[calculationArray.length] == "x") || (calculationArray[calculationArray.length] == "-") || (calculationArray[calculationArray.length] == "+")){
      calculationArray.splice(calculationArray.length-1,2);
    }else {
      console.log("entry: ",entry);
      calculationArray[calculationArray.length]=parseInt(entry);
    }
    calculate();
  }else {
    entry = entry + buttonPressed;
    display.textContent = entry;
    //calculationArray[calculationArray.length]=parseInt(buttonPressed);
    //calculationArray[calculationArray.length]=parseInt(entry);
    console.log(entry);
  }
  //calculationArray[calculationArray.length] = buttonPressed;
  //calculationArray[calculationArray.length] = entry;
  //console.log(entry);
  //console.log(buttonPressed);
  console.log(calculationArray);
}
let calculationArray = [];
let display = document.querySelector("#answer");
let buttons = document.querySelectorAll("button");
let entry = "";
let total = 0;
for (i=0; i<buttons.length; i++){
  let button = buttons[i];
  button.addEventListener("click", addToDisplay);
}
