const fs = require('fs');
const {readFile} = require('fs/promises');
const path = require('path');
const wordCount = require('word-count');


const configPath = path.join(__dirname, 'config.json');
const config = require('./config.json');
const filePaths = config.files;

async function readFiles(filePath){
  
    try {
      // get folder name 
      const folderName = path.basename(path.dirname(filePath));
      // get file name 
      const  fileName = filePath.split(/(\\|\/)/g).pop();

      const data = await readFile(filePath,'utf8', (err, content) => {
          if (err) {
            console.error(`Error reading ${filePath}: ${err}`);
            return;
          }

        });

        // print files \ fileName and count of words if count = 0 the retrun file is empty
        console.log(`${folderName}\\${fileName}: ${wordCount(data.toString()) === 0 ? 'Empty file' : wordCount(data.toString())} words`);

    } catch (error) {
        console.error(`Files that do not exist: ${error.message}`);
    }
}

filePaths.forEach(filePath => {
  const absoluteFilePath = path.join(__dirname, filePath);
  readFiles(absoluteFilePath);

});
