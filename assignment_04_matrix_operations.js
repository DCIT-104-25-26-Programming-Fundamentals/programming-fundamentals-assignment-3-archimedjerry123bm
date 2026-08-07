const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Reads a matrix of size rows x cols from user input.
 * @param {number} rows 
 * @param {number} cols 
 * @param {string} matrixName - Optional name identifier for user prompts
 * @returns {number[][]} The user-entered matrix
 */
function readMatrix(rows, cols, matrixName = '') {
  const label = matrixName ? ` [${matrixName}]` : '';
  const matrix = [];
  
  for (let i = 0; i < rows; i++) {
    let rowInput = readlineSync.question(`  Enter row ${i + 1}${label}: `);
    // Split input line by whitespace and convert values to numbers
    let rowValues = rowInput.trim().split(/\s+/).map(Number);

    // Validate number of columns entered
    while (rowValues.length !== cols || rowValues.some(isNaN)) {
      console.log(`  ⚠ Invalid input. Please enter exactly ${cols} space-separated numbers.`);
      rowInput = readlineSync.question(`  Enter row ${i + 1}${label}: `);
      rowValues = rowInput.trim().split(/\s+/).map(Number);
    }
    
    matrix.push(rowValues);
  }
  
  return matrix;
}

/**
 * Displays a matrix in a neatly aligned grid format.
 * @param {number[][]} matrix 
 */
function printMatrix(matrix) {
  if (!matrix || matrix.length === 0) return;

  for (let i = 0; i < matrix.length; i++) {
    const rowStr = matrix[i]
      .map(val => String(val).padStart(5, ' '))
      .join(' ');
    console.log(`  ${rowStr}`);
  }
}

// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
/**
 * Computes the transpose of an M x N matrix.
 * @param {number[][]} matrix 
 * @returns {number[][]} N x M transposed matrix
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
/**
 * Adds two matrices of size M x N element-wise.
 * @param {number[][]} matrixA 
 * @param {number[][]} matrixB 
 * @returns {number[][]} M x N sum matrix
 */
function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
/**
 * Multiplies an M x N matrix A by an N x P matrix B.
 * @param {number[][]} matrixA 
 * @param {number[][]} matrixB 
 * @returns {number[][]} M x P product matrix
 */
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// MAIN PROGRAM EXECUTION
// -----------------------------------------------------------------------------
function main() {
  console.log('=====================================================');
  console.log('            PART A: MATRIX TRANSPOSE                 ');
  console.log('=====================================================');
  const rowsA = Number(readlineSync.question('Enter number of rows: '));
  const colsA = Number(readlineSync.question('Enter number of columns: '));
  
  const matrixA = readMatrix(rowsA, colsA);

  console.log('\nOriginal Matrix:');
  printMatrix(matrixA);

  const transposed = transposeMatrix(matrixA);
  console.log('\nTransposed Matrix:');
  printMatrix(transposed);

  console.log('\n=====================================================');
  console.log('              PART B: MATRIX ADDITION               ');
  console.log('=====================================================');
  console.log(`Using dimensions: ${rowsA} x ${colsA}\n`);
  
  console.log('Matrix 1:');
  const addMat1 = readMatrix(rowsA, colsA, 'Matrix 1');
  console.log('Matrix 2:');
  const addMat2 = readMatrix(rowsA, colsA, 'Matrix 2');

  const sumResult = addMatrices(addMat1, addMat2);
  console.log('\nSum (Matrix 1 + Matrix 2):');
  printMatrix(sumResult);

  console.log('\n=====================================================');
  console.log('           PART C: MATRIX MULTIPLICATION             ');
  console.log('=====================================================');
  const m = Number(readlineSync.question('Enter rows for Matrix A (M): '));
  const n = Number(readlineSync.question('Enter columns for Matrix A / rows for Matrix B (N): '));
  const p = Number(readlineSync.question('Enter columns for Matrix B (P): '));

  console.log(`\nEnter Matrix A (${m} x ${n}):`);
  const multA = readMatrix(m, n, 'A');

  console.log(`\nEnter Matrix B (${n} x ${p}):`);
  const multB = readMatrix(n, p, 'B');

  const productResult = multiplyMatrices(multA, multB);
  console.log(`\nProduct (Matrix A x Matrix B) [${m} x ${p}]:`);
  printMatrix(productResult);
}

// Run the main program
main();