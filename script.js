let firstTerm = "";
let secondTerm ="";
let thirdTerm = "";
let decf = 0;
let dect = 0;
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const func = ["AC", "C", "="];


function updatePage(key){
    if(!firstTerm) firstTerm = 0;
    let firstPart = firstTerm;
    let thirdPart = thirdTerm;

    let total = firstPart + secondTerm + thirdPart;
    if(secondTerm && key === "="){
        if(!thirdTerm) return;
        total = evaluate();
        if(total.length > 10) total = "Infinity";
        firstTerm = total;
        secondTerm = "";
        thirdTerm = "";
        if(firstTerm.includes(".")) decf = 1;
        else decf = 0;
        dect = 0;

    }
    content.textContent = total;
    output.appendChild(content);
}

function evaluate(){
    firstNum = +firstTerm;
    secondNum = +thirdTerm;
    if(secondTerm === " + ") return (Math.round((firstNum + secondNum)*100)/100).toString();
    if(secondTerm === " * ") return (Math.round((firstNum * secondNum)*100)/100).toString();
    if(secondTerm === " / "){
        if(secondNum === 0) return ">:(";
        return (Math.round((firstNum / secondNum)*100)/100).toString();
    }
    if(secondTerm === " - ") return (Math.round((firstNum - secondNum)*100)/100).toString();
    if(secondTerm === " % ") return (Math.round(((firstNum/100) * secondNum)*100)/100).toString();
}

const output = document.querySelector("#terminal");
const content = document.createElement("div");
content.classList.add("content");

const buttons = document.querySelector("#buttons");


buttons.addEventListener("click", (button) => {

    if(!button.target.closest("button"))return;

    let key = button.target.textContent;
    if(firstTerm === ">:(" || firstTerm === "Infinity") firstTerm = "";
    if(!firstTerm && nums.includes(key)) firstTerm = key;
    else if(firstTerm && !secondTerm && !nums.includes(key) && !func.includes(key)) secondTerm = " " + key + " ";
    else if(!secondTerm && nums.includes(key) && !func.includes(key)){
        if(key === "."){
            if(!decf){
                firstTerm += key;
                decf++;
            }
        }
        else firstTerm += key;
    }
    else if(!thirdTerm && secondTerm && nums.includes(key) && !func.includes(key)) thirdTerm = key;
    else if(thirdTerm && nums.includes(key) && !func.includes(key)){
        if(key === "."){
            if(!dect){
                thirdTerm += key;
                dect++;
            }
        }
        else thirdTerm += key;
    }
    else if(thirdTerm && !nums.includes(key) && !func.includes(key)){
        firstTerm = evaluate();
        if(firstTerm.includes(".")) decf = 1;
        else decf = 0;
        thirdTerm = "";
        secondTerm = " " + key + " ";
        dect = 0;
    }
    else if(key === "AC") {
        firstTerm = "";
        secondTerm = "";
        thirdTerm = "";
        decf = 0;
        dect = 0;
    }
    else if(key === "C"){
        if(thirdTerm){
            if(thirdTerm.charAt(thirdTerm.length - 1) === ".") dect = 0;
            thirdTerm = thirdTerm.slice(0, -1);
        }
        else if(secondTerm) secondTerm = "";
        else if(firstTerm){
            if(firstTerm.charAt(firstTerm.length - 1) === ".") decf = 0;
            firstTerm = firstTerm.slice(0, -1);
        }
    }
    updatePage(key);
})

updatePage();