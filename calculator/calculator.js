function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
    //console.log(num);
    document.getElementById("history-value").innerText = num;
}

function printResult(num){
    if(num===""){
        document.getElementById("output-value").innerText = 0;
    }else{
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getOutput() {
    return  document.getElementById("output-value").innerText;
}

function clearResult() {
    document.getElementById("output-value").innerText = 0;
}

function getFormattedNumber(num) {
    if(num==="-"){
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

let operator = document.getElementsByClassName("operator");
for(let i = 0; i < operator.length;i++) {
    operator[i].addEventListener('click', function() {
            if(this.id==="clear"){
                printHistory("");
                printResult("");
            }
            else if(this.id==='backspace'){
                let output=reverseNumberFormat(getOutput()).toString();
                if(output) {
                    output = output.substr(0, output.length-1);
                    printResult(output);
                }
            }
            else{
                let output = getOutput();
                let history = getHistory();
                if(output===""&& history!=""){
                    if(isNaN(history[history.length-1])){
                        history = history.substr(0,history.length-1);
                    }
                }
                if(output!="" || history!=""){
                    output= output===""?
                    output:reverseNumberFormat(output);
                    history = history + output;
                    if(this.id==="="){
                        let result = eval(history);
                        printResult(result);
                        printHistory("");
                    }
                    else{
                        output="";
                        printResult(output);
                        history = history + this.id;
                        printHistory(history);
                    }
                }
            }
        })
}

let number = document.getElementsByClassName("number");
for(let i = 0; i < number.length;i++) {
    number[i].addEventListener('click', function() {
        var output=reverseNumberFormat(getOutput());
        if(output!=NaN) {
            output=output+this.id;
            printResult(output);
        }
    })
}
