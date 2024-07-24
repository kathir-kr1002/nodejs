const fs = require('fs');
const path = require('path');

// Function to read, modify, and write file
function modifyFile(inputFilePath, outputFilePath, modifyContent) {
  // Read the content of the input file
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Modify the content of the file
    const modifiedData = modifyContent(data);

    // Write the modified content to the output file
    fs.writeFile(outputFilePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
        return;
      }
      console.log('File has been written successfully!');
    });
  });
}

// Example usage:
const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

// Define a function to modify the content
function modifyContent(data) {
  return data.toUpperCase();
}

// Call the function to modify the file
modifyFile(inputFilePath, outputFilePath, modifyContent);

// Prevent the script from exiting immediately
setInterval(() => {
  console.log('Waiting for file changes...');
}, 1000);
