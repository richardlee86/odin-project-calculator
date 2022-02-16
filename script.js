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
            case '+': 
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