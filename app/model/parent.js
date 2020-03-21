var method = Parent.prototype;

function Parent(firstName, 
				middleName, 
				lastName, 
				sex,
				dob, 
				fatherName, 
				motherName, 
				spouseName, 
				guardianName, 
				address,
				mobile,
				emailId,
				alternateMobile,
				alternateEmailId,
				comments) {
	this.firstName = firstName;
	this.middleName = middleName;
	this.lastName = lastName;
	this.sex = sex;
	this.dob = dob;
	this.fatherName = fatherName;
	this.motherName = motherName;
	this.guardianName = guardianName;
	this.spouseName = spouseName;
	this.comments = comments;
}