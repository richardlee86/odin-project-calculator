class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand; 
        this.currentOperand = currentOperand; 
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined; 
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString(); 
    }

    selectOperation (operation) {
        if(this.currentOperand === '') {
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation; 
        this.previousOperand = this.currentOperand; 
        this.currentOperand = ''; 
        
    }
    //
    compute() {        
        let computation; 
        const prev = parseFloat(this.previousOperand); 
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+' : 
                computation = prev + current;
                break;
            case '-': 
                computation = prev - current;
                break;
            case '*': 
                computation = prev * current;
                break;
            case '÷': 
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation; 
        this.operation = undefined; 
        this.previousOperand = ''; 
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString(); 
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay; 
        if(isNaN(integerDigits)) {
            integerDisplay = '';            
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay; 
        }        
    }
    
    updateDisplay() {
       currentOperand.textContent = this.getDisplayNumber(this.currentOperand);
       if(this.operation != null) {
        previousOperand.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
       } else {
           previousOperand.textContent = '';
       }
       
    }
}

//Query Selectors for calculator buttons 
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
let previousOperand = document.querySelector('[data-previous-operand]');
let currentOperand = document.querySelector('[data-current-operand]');
const deleteButton = document.querySelector('[data-delete]');


const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })    
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.textContent);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute(); 
    calculator.updateDisplay();
})
clearButton.addEventListener('click', button => {
    calculator.clear(); 
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete(); 
    calculator.updateDisplay();
})

window.addEventListener('keydown', event => {
    let key = event.keyCode;    
    switch (key) {
        case  97: 
        case 49:
            calculator.appendNumber(1); 
            calculator.updateDisplay();
            break;

        case 98:
        case 50:
            calculator.appendNumber(2); 
            calculator.updateDisplay();
            break;
        case 99:
        case 51:
            calculator.appendNumber(3); 
            calculator.updateDisplay();
            break;
        case 100:
        case 52:
            calculator.appendNumber(4); 
            calculator.updateDisplay();
            break;
        case 101:
        case 53:
            calculator.appendNumber(5); 
            calculator.updateDisplay();
            break;
        case 102:
        case 54:
            calculator.appendNumber(6); 
            calculator.updateDisplay();
            break;
        case 103:
        case 55:
            calculator.appendNumber(7); 
            calculator.updateDisplay();
            break;
        case 104:
        case 56:
            calculator.appendNumber(8); 
            calculator.updateDisplay();
            break;
        case 105:
        case 57:
            calculator.appendNumber(9); 
            calculator.updateDisplay();
            break;
        case 96:
        case 48:
            calculator.appendNumber(0); 
            calculator.updateDisplay();
            break;
        case 107:        
            calculator.selectOperation('+');
            calculator.updateDisplay();
            break;
        case 109:        
            calculator.selectOperation('-');
            calculator.updateDisplay();
            break;
        case 110:
            calculator.appendNumber('.'); 
            calculator.updateDisplay();
            break;
        case 106:        
            calculator.selectOperation('*');
            calculator.updateDisplay();
            break;
        case 111:
            calculator.selectOperation('÷');
            calculator.updateDisplay();
            console.log(calculator.updateDisplay())
            break;
        case 13:
            calculator.compute(); 
            calculator.updateDisplay();
            break;

        case 8:
            calculator.delete(); 
            calculator.updateDisplay();
            break; 
    
        default:
            break;
    }   
      
})