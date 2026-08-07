// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 7
// =============================================================================
//
// TASK: Console-Based To-Do List Application
//
// Build a simple to-do list program that runs entirely in the console and
// allows the user to manage their tasks interactively using a menu.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_07_todo_list.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Task
//      - Prompt the user to type a task description.
//      - Add it to the array and confirm it was added.
//
//   2. View All Tasks
//      - Display all tasks currently in the array, numbered from 1.
//      - If the array is empty, print a friendly message saying so.
//
//   3. Delete a Task
//      - Show the list of tasks with their numbers.
//      - Ask the user which task number they want to remove.
//      - Remove the task and confirm the deletion.
//      - If the task number is invalid, print an error message.
//
//   4. Quit
//      - End the program with a farewell message.
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        TO-DO LIST MENU
//   ============================
//   1. Add task
//   2. View tasks
//   3. Delete task
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Enter task: Buy groceries
//   Task added: "Buy groceries"
//
//   Enter your choice (1-4): 2
//   Your Tasks:
//   1. Buy groceries
//   2. Study for exams
//
//   Enter your choice (1-4): 3
//   Enter task number to delete: 1
//   Task "Buy groceries" has been removed.
//
//   Enter your choice (1-4): 4
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store tasks in a JavaScript array (e.g. let tasks = []).
// - Use a loop to keep the menu running until the user chooses to quit.
// - Each feature MUST be implemented in its own function (see scaffold below).
// - Handle invalid menu choices gracefully (print an error, do not crash).
// - To remove an item from an array by index, use: tasks.splice(index, 1)
//
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

// Global array to hold the list of task descriptions
let tasks = [];

/**
 * 1. Add a Task
 * Prompts the user for a task description and pushes it to the tasks array.
 */
function addTask() {
  const task = readline.question('Enter task: ');

  // Check if the input is empty or contains only whitespace
  if (task.trim() === '') {
    console.log('Task cannot be empty. Please try again.');
    return;
  }

  tasks.push(task.trim());
  console.log(`Task added: "${task.trim()}"`);
}

/**
 * 2. View All Tasks
 * Displays all tasks in the array numbered starting from 1.
 */
function viewTasks() {
  if (tasks.length === 0) {
    console.log('\nYour to-do list is currently empty!');
    return;
  }

  console.log('\nYour Tasks:');
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${i + 1}. ${tasks[i]}`);
  }
}

/**
 * 3. Delete a Task
 * Prompts for a task number (1-indexed), validates it, and removes it from the array.
 */
function deleteTask() {
  if (tasks.length === 0) {
    console.log('\nNo tasks available to delete.');
    return;
  }

  // Show the tasks first so the user knows which number to select
  viewTasks();
  
  const input = readline.question('\nEnter task number to delete: ');
  const taskNumber = parseInt(input, 10);

  // Validate that input is a valid integer within 1 and array length
  if (isNaN(taskNumber) || taskNumber < 1 || taskNumber > tasks.length) {
    console.log('Invalid task number. Please try again.');
    return;
  }

  // Convert 1-based user input to 0-based array index
  const index = taskNumber - 1;
  const removedTask = tasks.splice(index, 1)[0];

  console.log(`Task "${removedTask}" has been removed.`);
}

/**
 * Main application loop to display the menu and route choices.
 */
function runTodoListApp() {
  let isRunning = true;

  while (isRunning) {
    console.log('\n============================');
    console.log('       TO-DO LIST MENU      ');
    console.log('============================');
    console.log('1. Add task');
    console.log('2. View tasks');
    console.log('3. Delete task');
    console.log('4. Quit');

    const choice = readline.question('Enter your choice (1-4): ').trim();

    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        viewTasks();
        break;
      case '3':
        deleteTask();
        break;
      case '4':
        console.log('Goodbye!');
        isRunning = false;
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 4.');
        break;
    }
  }
}

// Start the application
runTodoListApp();
