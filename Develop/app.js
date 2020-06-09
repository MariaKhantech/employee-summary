const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
console.log(outputPath, OUTPUT_DIR);
const render = require('./lib/htmlRenderer');

//testing that objects were created
const manager = new Manager('Mike Flower', 01, 'mikeflower22@gmail.com', '603-222-2223');
const engineer1 = new Engineer('Ryan Powers', 02, 'ryanpowers@gmail.com', 'ryantechnerd');
const engineer2 = new Engineer('Jose Sanchez', 03, 'josesanchez22@gmail.com', 'josetechyman');
const intern1 = new Intern('Martha Pena', 04, 'marthapena1@gmail.com', 'University of New Hampshire');
const intern2 = new Intern('Sheena Brissot', 04, 'sheenabrissot@gmail.com', 'University of New York');

const employees = [ manager, engineer1, engineer2, intern1, intern2 ];

const renderedHTML = render(employees);

//checking to see if output folder exists
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR);
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
