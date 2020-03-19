var method = Student.prototype;

function Student(firstName, middleName, lastName, dob, fatherName, motherName, guardianName, comments) {
	this.firstName = firstName;
	this.middleName = middleName;
	this.lastName = lastName;
	this.dob = dob;
	this.fatherName = fatherName;
	this.motherName = motherName;
	this.guardianName = guardianName;
	this.comments = comments;

	// Initialization
	this.id = -1;
}

function Student(firstName, middleName, lastName, dob, fatherName, motherName, guardianName, comments, id) {
	this.firstName = firstName;
	this.middleName = middleName;
	this.lastName = lastName;
	this.dob = dob;
	this.fatherName = fatherName;
	this.motherName = motherName;
	this.guardianName = guardianName;
	this.comments = comments;
	this.id = id;
}

method.getFirstName = function() {
	return this.firstName;
};

method.getMiddleName = function() {
	return this.middleName;
};

method.getLastName = function() {
	return this.lastName;
};

method.getDob = function() {
	return this.dob;
};

method.getFatherName = function() {
	return this.fatherName;
};

method.getMotherName = function() {
	return this.motherName;
};

method.getGuardianName = function() {
	return this.guardianName;
};

method.getComments = function() {
	return this.comments;
};

method.getId = function() {
	return this.id;
};