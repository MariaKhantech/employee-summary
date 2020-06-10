const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

//creates output folder and creates a path to renderHTML
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
const render = require('./lib/htmlRenderer');

//Questions to create team manager
const managerQuestions = [
	{
		type: 'input',
		name: 'managerName',
		message: 'What is first and last name?'
	},
	{
		type: 'input',
		name: 'managerId',
		message: 'What is your employee ID?'
	},
	{
		type: 'input',
		name: 'managerEmail',
		message: 'What is your company email?'
	},
	{
		type: 'input',
		name: 'managerOfficenumber',
		message: 'What is your office number?'
	}
];

//Questions to create team manager
const engineerQuestions = [
	{
		type: 'input',
		name: 'engineerName',
		message: 'What is the first and last name?'
	},
	{
		type: 'input',
		name: 'engineerId',
		message: 'What is their employee ID?'
	},
	{
		type: 'input',
		name: 'engineerEmail',
		message: 'What is their company email?'
	},
	{
		type: 'input',
		name: 'engineerGithub',
		message: 'What is their GitHub username?'
	}
];

//Questions to create team manager
const internQuestions = [
	{
		type: 'input',
		name: 'internName',
		message: 'What is the first and last name?'
	},
	{
		type: 'input',
		name: 'internId',
		message: 'What is their employee ID?'
	},
	{
		type: 'input',
		name: 'internEmail',
		message: 'What is their company email?'
	},
	{
		type: 'input',
		name: 'internSchool',
		message: 'What school did they attend?'
	}
];

//Prompt for new Employee
const addEmployeeQuestion = [
	{
		type: 'confirm',
		name: 'addEmployee',
		message: 'Would you like to add another employee?'
	},
	{
		//stack overflow https://stackoverflow.com/questions/49520423/is-there-a-way-to-use-previous-answers-in-inquirer-when-presenting-a-prompt-inq
		//if the answer above is yes then we ask which type of employee to add
		when: (response) => {
			return response.addEmployee === true;
		},
		type: 'list',
		name: 'employeeType',
		message: 'What type of employee would you like to add?',
		choices: [ 'Engineer', 'Intern' ]
	}
];

//employees
const employees = [];

//function to ask the manager if he wants more employees
const askManagerAdd = async () => {
	await inquirer
		.prompt(addEmployeeQuestion)
		.then(async (response) => {
			//checks if manager wants to add an employee
			if (response.addEmployee === true) {
				//checks employee type
				if (response.employeeType === 'Engineer') {
					//ask the engineer questions
					askEngineerAdd();
				} else {
					//ask the intern questions
					askInternAdd();
				}
				//calling function inside itself to go back and ask manager if wants to add another employee
				askManagerAdd();
			}
		})
		.catch((error) => {
			throw error;
		});
};

//function that prompts Engineer questions
const askEngineerAdd = async () => {
	await inquirer
		.prompt(engineerQuestions)
		.then(async (response) => {
			const engineer = new Engineer(
				response.engineerName,
				response.engineerId,
				response.engineerEmail,
				response.engineerGithub
			);
			employees.push(engineer);
		})
		.catch((error) => {
			throw error;
		});
};

//function that prompts the Intern questions
const askInternAdd = async () => {
	await inquirer
		.prompt(internQuestions)
		.then(async (response) => {
			const intern = new Intern(
				response.internName,
				response.internId,
				response.internEmail,
				response.internSchool
			);
			employees.push(intern);
		})
		.catch((error) => {
			throw error;
		});
};

//entry point that asks the questions, builds HTML and writes to file
const init = async () => {
	//prompting manager questions
	await inquirer
		.prompt(managerQuestions)
		.then(async (response) => {
			const manager = new Manager(
				response.managerName,
				response.managerId,
				response.managerEmail,
				response.managerOfficenumber
			);
			//pushing manager into the array starts position 0
			employees.push(manager);
		})
		.catch((error) => {
			throw error;
		});

	//start asking the questions to the users
	const renderedHTML = await render(employees);
	//checking to see if output folder exists
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR);
	}
	//writes renderedHTML to a file in outputpath
	fs.writeFile(outputPath, renderedHTML, (err) => {
		if (err) {
			throw err;
		}
		console.log('getting deleted');
	});
};

//calling init function
init();

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
