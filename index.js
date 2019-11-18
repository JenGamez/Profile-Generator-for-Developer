const fs = require("fs");
var pdf = require('html-pdf');
var options = { format: 'Letter' };
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
    .then(function ({ username, FavColor }) {
      const color = FavColor

      const queryURL = `https://api.github.com/users/${username}`
      axios.get(queryURL).then(function (res) {
        console.log(res)

        res.data.color = color

        const html = generateHTML(res.data);

        console.log(html)
        
        pdf.create(html, options).toFile('./profile.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/app/businesscard.pdf' }
        });


      })

    })
}

init();

