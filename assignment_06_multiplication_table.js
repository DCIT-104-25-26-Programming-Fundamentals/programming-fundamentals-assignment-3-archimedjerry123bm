// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_06_multiplication_table.js
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

/**
 * Helper function to print a formatted multiplication table for a single number.
 * @param {number} num - The number to generate the table for.
 */
function printTableForNumber(num) {
    console.log(`\nMultiplication Table for ${num}:`);
    for (let i = 1; i <= 12; i++) {
        const product = num * i;
        // padStart keeps numbers aligned neatly when i >= 10
        const formattedIndex = String(i).padStart(2, ' ');
        console.log(`${num}  x  ${formattedIndex}  =  ${product}`);
    }
}

/**
 * Validates whether the input string is a valid positive integer (> 0).
 * @param {string} input - Raw string from user.
 * @returns {boolean} True if valid positive integer, false otherwise.
 */
function isValidPositiveInteger(input) {
    const num = Number(input);
    return Number.isInteger(num) && num > 0;
}

// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
function runPartA() {
    console.log("=== PART A: Single Table ===");
    const rawInput = readline.question("Enter a positive number: ");

    if (!isValidPositiveInteger(rawInput)) {
        console.log("Error: Invalid input. Please enter a positive integer greater than 0.");
        return false; // Signal invalid input to caller
    }

    const number = parseInt(rawInput, 10);
    printTableForNumber(number);
    return true;
}

// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
function runPartB() {
    console.log("\n=== PART B: Tables from 1 to N ===");
    const rawInput = readline.question("Enter a positive number N: ");

    if (!isValidPositiveInteger(rawInput)) {
        console.log("Error: Invalid input. Please enter a positive integer greater than 0.");
        return;
    }

    const n = parseInt(rawInput, 10);

    for (let currentNum = 1; currentNum <= n; currentNum++) {
        printTableForNumber(currentNum);
        
        // Print separator between tables, but omit it after the final table
        if (currentNum < n) {
            console.log("---------------------------");
        }
    }
}

// -----------------------------------------------------------------------------
// MAIN EXECUTION
// -----------------------------------------------------------------------------
function main() {
    const successA = runPartA();
    
    // Only proceed to Part B if Part A succeeds (or feel free to run both)
    if (successA) {
        console.log("\n" + "=".repeat(40));
        runPartB();
    }
}

main();
