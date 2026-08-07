// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readline = require("readline-sync");

// Main data store: array of student objects
const studentDatabase = [];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculates the average of an array of numbers.
 * @param {number[]} scores - Array of numerical test scores.
 * @returns {number} The calculated average score.
 */
function computeAverage(scores) {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return sum / scores.length;
}

// =============================================================================
// CORE FEATURE FUNCTIONS
// =============================================================================

/**
 * Feature 1: Add a Student
 * Collects name, ID, and scores from user input and saves to database.
 */
function addStudent() {
  console.log("\n--- Add a New Student ---");

  const name = readline.question("Student name: ").trim();
  if (!name) {
    console.log("Error: Name cannot be empty.");
    return;
  }

  const idInput = readline.question("Student ID: ");
  const id = Number(idInput);
  if (isNaN(id) || idInput.trim() === "") {
    console.log("Error: Student ID must be a valid number.");
    return;
  }

  // Check if ID already exists
  const existingStudent = studentDatabase.find((student) => student.id === id);
  if (existingStudent) {
    console.log(`Error: A student with ID ${id} already exists.`);
    return;
  }

  const scoreCountInput = readline.question("How many scores? ");
  const scoreCount = parseInt(scoreCountInput, 10);

  if (isNaN(scoreCount) || scoreCount < 1) {
    console.log("Error: Please enter a valid number of scores (at least 1).");
    return;
  }

  const scores = [];
  for (let i = 1; i <= scoreCount; i++) {
    const scoreInput = readline.question(`Enter score ${i}: `);
    const score = Number(scoreInput);

    if (isNaN(score) || score < 0 || score > 100) {
      console.log("Invalid score! Please enter a number between 0 and 100.");
      i--; // Retry this iteration
      continue;
    }

    scores.push(score);
  }

  // Create student object and append to database
  const newStudent = { name, id, scores };
  studentDatabase.push(newStudent);

  console.log(`\nStudent "${name}" added successfully.`);
}

/**
 * Feature 2: Display All Students
 * Prints a formatted list/table of all stored student records.
 */
function displayAllStudents() {
  console.log("\n--- All Student Records ---");

  if (studentDatabase.length === 0) {
    console.log("No student records available yet.");
    return;
  }

  // Table header formatting
  console.log(
    "-----------------------------------------------------------------------"
  );
  console.log(
    `| ${"ID".padEnd(10)} | ${"Name".padEnd(20)} | ${"Scores".padEnd(18)} | ${"Average".padEnd(8)} |`
  );
  console.log(
    "-----------------------------------------------------------------------"
  );

  studentDatabase.forEach((student) => {
    const scoresStr = student.scores.join(", ");
    const avgStr = computeAverage(student.scores).toFixed(2);

    console.log(
      `| ${String(student.id).padEnd(10)} | ${student.name.padEnd(20)} | ${scoresStr.padEnd(18)} | ${avgStr.padEnd(8)} |`
    );
  });

  console.log(
    "-----------------------------------------------------------------------"
  );
}

/**
 * Feature 3: Calculate Average Score for a Specific Student
 * Prompts for student ID and outputs their exact average.
 */
function calculateAverage() {
  console.log("\n--- Calculate Student Average ---");

  if (studentDatabase.length === 0) {
    console.log("No student records available to calculate.");
    return;
  }

  const idInput = readline.question("Enter student ID: ");
  const id = Number(idInput);

  if (isNaN(id) || idInput.trim() === "") {
    console.log("Error: Please enter a valid numerical ID.");
    return;
  }

  const student = studentDatabase.find((s) => s.id === id);

  if (!student) {
    console.log(`Error: No student found with ID ${id}.`);
  } else {
    const avg = computeAverage(student.scores).toFixed(2);
    console.log(`${student.name}'s average score: ${avg}`);
  }
}

// =============================================================================
// MAIN MENU & APPLICATION LOOP
// =============================================================================

function startApp() {
  let isRunning = true;

  while (isRunning) {
    console.log("\n==================================");
    console.log("   STUDENT RECORD SYSTEM MENU   ");
    console.log("==================================");
    console.log("1. Add student");
    console.log("2. Display all students");
    console.log("3. Calculate average score");
    console.log("4. Quit");

    const choice = readline.question("Enter your choice (1-4): ").trim();

    switch (choice) {
      case "1":
        addStudent();
        break;
      case "2":
        displayAllStudents();
        break;
      case "3":
        calculateAverage();
        break;
      case "4":
        console.log("\nExiting Student Record System. Goodbye!");
        isRunning = false;
        break;
      default:
        console.log("\nInvalid choice! Please enter a number between 1 and 4.");
        break;
    }
  }
}

// Run application
startApp();

