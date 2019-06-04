var operant = ['AC','C','%','/','*','-','+','='];
var temp = '';

$('#keys-container .key button').on('click', function(){
    var value = $(this).text();

    /*** OLD WAY
    if(operant.includes(value) && value == '='){
        temp = eval(temp);
        temp = temp.toString();
    }else if(value == 'AC'){
        temp = '';
    }else if(value == 'C'){
        temp = temp.slice(0,-1);
    }else{
        temp += value;
    }
    ***/

    if(operant.includes(value)){

        if (temp[temp.length -1] == value){return false;} //prevent repeated operant

        switch(value){
            case '=':
                temp = eval(temp);
                temp = temp.toString();
            break;
            case 'AC':
                temp = '';
            break;
            case 'C':
                temp = temp.slice(0,-1);
            break;
            default:
                temp += value;
        }

    }else{
        temp += value;
    }

    updatescreen(temp);
});

function updatescreen(value){
    $('#mainbody-calculator #screen span').text(value);
}


