// TODO: Write code to define and export the Employee class
//### Classes
//The project must have the these classes: `Employee`, `Manager`, `Engineer`,
//`Intern`. The tests for these classes in the `tests` directory must all pass.

//The first class is an `Employee` parent class with the following properties and
//methods:
class Employee {
	constructor(name, id, email) {
		this.name = name;
		this.id = id;
		this.email = email;
	}
	getId() {
		return this.id;
	}
	getName() {
		return this.name;
	}
	getEmail() {
		return this.email;
	}
	getRole() {
		return `Employee`;
	}
}

module.exports = Employee;
