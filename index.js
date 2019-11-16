const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const generateHTML = require('./generateHTML');
// const path = require path?

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
   return inquirer.prompt([
     {
       type: "input",
       name: "username",
       message: "What is your GitHub username?"
     },
     {
       type: "list",
       message: "What is your favorite color?",
       name: "FavColor",
       choices: [
           "green",
           "blue",
           "pink",
           "red"
       ]
     }
   ]);
}


function init() {
    promptUser()
    .then(function(data) {
        const html = generateHTML(data);
    
    
        function writeToFile(fileName, data);
      })
      .then(function() {
        console.log("Successfully wrote to index.html");
      })
      .catch(function(err) {
        console.log(err);
      });

}
init();








