//This script requires jquery 
var operators = ['AC','C','%','/','*','-','+','=','.'];
var temp = '';

$('#key-container .key button').on('click', function(){
    var value = $(this).text(); //getting user input

    if(operators.includes(value)){ //checking if a math operation is to be performed
        
        //check if an operant is repeated
        if(temp[temp.length -1] == value){ 
            return false;
        }
        
        //remove the operant if it's the last char
        if(operators.includes(temp[temp.length -1]) && value != 'C'){ 
            temp = removeLastChar(temp);
        }

        switch(value){
            case '=':
                temp = eval(temp).toString();
            break;
            case 'AC':
                temp = '';
            break;
            case 'C':
                temp = removeLastChar(temp); //remove the last char
            break;
            case '%':
                if(temp.length < 1){
                    return false;
                }
                temp = (eval(temp)/100).toString(); //converting to percentage
            break;
            case '.':
                if(temp.includes(value)){ //prevent repeated .
                    return false;
                }else{
                    temp += value;
                }
            break;
            default:
                /** Putting the function below, above the switch statement 
                will cause AC, C, and etc to malfunction. **/
                //check if an operant is used right after another operant and is the first char
                if (operators.includes(temp[temp.length - 1]) || temp.length < 1){ 
                    return false;
                }
                temp += value;
        }
    }else{
        temp += value;
    }
    
    updateScreen(temp);
});

function updateScreen(value){
    $('#mainbody-calculator #screen span').text(value);
}

function removeLastChar(string){
    return string.slice(0, -1);
}


