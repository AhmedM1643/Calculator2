let equals;
class Calculator {
    constructor(previousButton, currentButton) {
        this.previousText = previousButton;
        this.currentText = currentButton;
        this.clear()
    }

    clear() {
        this.previous = "";
        this.current = "";
        this.operation = undefined;
    }

    delete() {
        this.current = this.current.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === "." && this.current.includes(".")) return;
        if (equals === true) {
            this.current = "";
            equals = false;
        }
        this.current += number.toString();
    }

    chooseOperation(operation) {
        if (this.current === "") return;
        if (this.previous != "") {
            this.compute()
        }
        this.operation = operation;
        this.previous = parseFloat(this.current);
        this.current = "";
    }

    compute() {
        let computation;
        let prev = parseFloat(this.previous);
        let curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) return;
        console.log("Computed")
        switch (this.operation) {
            case "+":
                computation = prev + curr;
                break;
            case "x":
                computation = prev * curr;
                break
            case "-":
                computation = prev - curr;
                break;
            case "÷":
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.current = computation;
        this.previous = '';
        this.operation = undefined;
        equals = true;

    } 
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits:0})
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentText.innerText = this.getDisplayNumber(this.current);
        if (this.operation != null) {
            this.previousText.innerText = `${this.previous} ${this.operation}`;
        } else {
            this.previousText.innerText = this.previous
        }
    }
}



const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const clearButton = document.querySelector("[data-clear]")
const previousButton = document.querySelector("[data-previous]");
const currentButton = document.querySelector("[data-current]");

const calculator = new Calculator(previousButton, currentButton);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", (btn) => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", (btn) => {
    location.reload()
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})