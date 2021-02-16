// Construct constant var
const operators = ['AC', 'C', '%', '/', '*', '-', '+', '=', '.'];
var f_operand = '';
var s_operand = '';
var operator = '';


function updateScreen(val){
    document.getElementById('screen').getElementsByTagName('span')[0].textContent = val;
}

function setOperand(val){
    if(operator){
        s_operand += val;
    }else{
        f_operand += val;
    }
}

// Dynamic funcion executioner
function setO(func1, func2){
    f_operand = f_operand.toString();
    s_operand = s_operand.toString();

    if(operator){
        func1();
    }else{
        func2();
    }
}

function setVariables(f, o, s){
    f_operand = f;
    s_operand = s;
    operator = o;
}

function keyboardEvent(e){

    El = e.target;
    val = El.textContent;

    let result;

    // if the clicked/typed value is a math operator
    if(operators.includes(val)){
        switch (val) {
            case '.':
                // setOperand(val);
                setO(()=>{s_operand += val}, ()=>{f_operand += val});
                break;
            case 'AC':
                setVariables('','','');
                updateScreen('');
                break;
            case 'C':
                setO(()=>{s_operand = s_operand.slice(0, -1)}, ()=>{f_operand = f_operand.slice(0, -1)});
                break;
            case '=':
                setO(()=>{
                    // if 2nd operand is not provided set it to 0
                    // s_operand = s_operand.length > 0 ? s_operand : 0;
                    if(s_operand.length > 0){
                        result = eval(`${f_operand} ${operator} ${s_operand}`);
                        setVariables(result, val, '');
                        updateScreen(result);
                    }else{
                        setVariables(f_operand, '', '');
                    }

                    // if(s_operand.length > 0){
                    //     s_operand = s_operand;
                    // }else{
                    //     operator = '';
                    //     s_operand = 0;
                        
                    // }

                }, ()=>{});
                break;
            default:
                setO(()=>{ // run this when the operator is set
                    if(s_operand.length > 0){
                        result = eval(`${f_operand} ${operator} ${s_operand}`);
                        setVariables(result, val, '');
                        updateScreen(result);
                    }else{
                        operator = val;
                    }
                }, ()=>{
                    // It an operater hasn't been set
                    operator = val;
                });

                /*if(operator){
                    result = eval(`${f_operand} ${operator} ${s_operand}`);
                    setVariables(result, val, '');
                    updateScreen(result);
                }else{
                    operator = val;
                }*/
                break;
        }
    }else if(!isNaN(val)){ // if val is not empty (number)
        setO(()=>{s_operand += val}, ()=>{f_operand += val});
        /*if(operator){
            s_operand += val;
        }else{
            f_operand += val;
        }*/
    }

    if(result != null){
        updateScreen(result);
    }else{
        if(s_operand){
            updateScreen(s_operand);
        }else{
            updateScreen(f_operand);
        }
    }

    
    console.log(f_operand);
    console.log(operator);
    console.log(s_operand);
    console.log(result);
}



function init(){

    document.getElementById('keys-container').onmouseup = keyboardEvent;

}

init();
