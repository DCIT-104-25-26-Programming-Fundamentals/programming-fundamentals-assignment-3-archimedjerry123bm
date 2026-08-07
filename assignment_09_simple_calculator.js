const readline = require('readline-sync');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero.";
    }
    return a / b;
}

function modulus(a, b) {
    if (b === 0) {
        return "Error: Cannot perform modulus by zero.";
    }
    return a % b;
}

function power(a, b) {
    return a ** b;
}

function formatResult(val) {
    if (typeof val === 'string') {
        return val;
    }
    return val.toFixed(2);
}

function main() {
    let running = true;

    while (running) {
        console.log("\n============================");
        console.log("      SIMPLE CALCULATOR     ");
        console.log("============================");
        console.log("1. Addition");
        console.log("2. Subtraction");
        console.log("3. Multiplication");
        console.log("4. Division");
        console.log("5. Modulus");
        console.log("6. Exponentiation");
        console.log("7. Quit");

        const choice = readline.question("Select an operation (1-7): ").trim();

        if (choice === '7') {
            console.log("Goodbye!");
            running = false;
            break;
        }

        if (!['1', '2', '3', '4', '5', '6'].includes(choice)) {
            console.log("Invalid choice. Please select a number between 1 and 7.");
            continue;
        }

        const num1 = parseFloat(readline.question("Enter first number : "));
        const num2 = parseFloat(readline.question("Enter second number: "));

        if (isNaN(num1) || isNaN(num2)) {
            console.log("Error: Please enter valid numeric values.");
            continue;
        }

        let result;
        let symbol;

        switch (choice) {
            case '1':
                symbol = '+';
                result = add(num1, num2);
                break;
            case '2':
                symbol = '-';
                result = subtract(num1, num2);
                break;
            case '3':
                symbol = '*';
                result = multiply(num1, num2);
                break;
            case '4':
                symbol = '/';
                result = divide(num1, num2);
                break;
            case '5':
                symbol = '%';
                result = modulus(num1, num2);
                break;
            case '6':
                symbol = '**';
                result = power(num1, num2);
                break;
        }

        if (typeof result === 'string') {
            console.log(result);
        } else {
            console.log(`Result: ${num1} ${symbol} ${num2} = ${formatResult(result)}`);
        }
    }
}

main();