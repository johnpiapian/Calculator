//Construct data
const operators = ['AC', 'C', '%', '/', '*', '-', '+', '=', '.'];
var screen = '';

function updateScreen(value) {
    var screen = document.getElementById('screen').getElementsByTagName('span');
    screen[0].innerText = value;
}

function removeLastChar(string) {
    return string.slice(0, -1);
}

function performCalculation(value) {

    // Check if a math operation is to be performed
    if (operators.includes(value)) { 

        // Check if the operant is repeated
        if (screen[screen.length - 1] == value) {
            return false;
        }

        // Remove the operant if it's the last char
        if (operators.includes(screen[screen.length - 1]) && value != 'C') {
            screen = removeLastChar(screen);
        }

        switch (value) {
            case '=':
                if (screen.length > 0) { screen = eval(screen).toString(); }
                break;
            case 'AC':
                screen = '';
                break;
            case 'C':
                screen = removeLastChar(screen); //remove the last char
                break;
            case '%':
                if (screen.length < 1) {
                    return false;
                }
                screen = (eval(screen) / 100).toString(); //converting to percentage
                break;
            case '.':
                if (screen.includes(value)) { //prevent repeated .
                    return false;
                } else {
                    screen += value;
                }
                break;
            default:
                /** Putting this function above the switch statement 
                will render AC, C, and etc to malfunction. **/

                // Check if an operant is used right after another or is the first char
                if (operators.includes(screen[screen.length - 1]) || screen.length < 1) {
                    return false;
                }
                screen += value;
        }
    } else {
        screen += value;
    }
    updateScreen(screen);
}

// Key-clicked handler 
function keyClicked(event) {
    var value = event.target.innerText;
    performCalculation(value);
}

// Key-typed handler
function keyTyped(event) {
    var key = event.key;

    // If the key is valid
    if (operators.includes(key) || !isNaN(key)) {
        if(key == '='){return false;} // ignore the equal sign
        performCalculation(key);
    } else if (key == 'Enter') {
        performCalculation('=');
    } else if (key == 'Backspace') {
        // If Shift+Backspace then clear screen
        if(event.shiftKey){
            performCalculation('AC');
        }else{
            performCalculation('C');
        }
    }
}

function init() {
    // Key-clicked event
    document.getElementById('keyboard').onclick = keyClicked;

    // Key-typed event
    document.onkeydown = keyTyped;
}

init();