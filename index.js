const fs = require('fs');
const path = require('path');
const wordCount = require('word-count');

const configPath = path.join(__dirname, 'config.json');
const config = require(configPath);

const filePaths = config.files;

function processFile(filePath) {
    // get file Name like => file1.txt
    const fileNmae = filePath.replace(/^.*[\\\/]/, '');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) { // check if an error in files
        console.error(`Error in reading => ${fileNmae}: => ${err}`);
        return;
      }
  
      const wordCountResult = wordCount(content);
      console.log(`${fileNmae}: ${wordCountResult} words`);
    });
  };

  filePaths.forEach(filePath => {
    const absoluteFilePath = path.join(__dirname, filePath);
    processFile(absoluteFilePath);
  });