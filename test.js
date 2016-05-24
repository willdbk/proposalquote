//variable declarations
var saveHistory = [new Version("John Smith", new Date(Date.now()))];
var validators = [new Validator("Client Executive", "", 0), new Validator("Practice Manager", "", 0), new Validator("Legal", "", 0)];
window.onload = run;


//object definitions
function Validator(title, name, approved) {
	this.title = title;
	this.name = name;
	this.approved = approved;
}

function Version(name, date) {
	this.name = name;
	this.date = date;
}

//calls initial functions
function run() { 
	$("#templates").load("http://localhost:8000/template.html", function() {
		createFormGroups();
		updateApprovalTable();
		updateSaveHistory();
	})
}


//html generation functions
function createFormGroups() {
	$("#formgroups").html("");
	var template1 = $('#template1').html();
	$("#formgroups").append(Mustache.render(template1, {name: "Project Information"}));
	var template2 = $('#template2').html();
	for(var index in validators) {	
		$("#formgroups").append(Mustache.render(template2, {name: validators[index].name, title: validators[index].title}));
		if(index == 0) {
			$("#formgroups").append('<div class="add-btn-holder"><button type="button" class="btn btn-main" onclick="addValidator()">Add Validator <span class="glyphicon glyphicon-plus"></span></button></div>');
		}
	}
}

function updateApprovalTable() {
	var html = '<tbody>';
	for(var index in validators) {
		var approved = validators[index].approved;
		var glyphiconStyle = '';
		if (approved == 0) {
			glyphiconStyle += 'glyphicon-remove';
		}
		else  {
			glyphiconStyle += 'glyphicon-ok';
			if(approved == 1) {
				glyphiconStyle += ' soft-approved';
			}
		}
		var template3 = $('#template3').html();
		var validator = validators[index]
		html += Mustache.render(template3, {name: validator.name, title: validator.title, glyphicon: glyphiconStyle})
	}
	html += '</tbody>';
	$("#approvalTable").html(html);
}

function updateSaveHistory() {
	var html = "";
	for(var index in saveHistory) {
		var save = saveHistory[saveHistory.length - 1 - index];
		var add = '<p>' + save.name + ' at ' + save.date.toLocaleTimeString("en-US") + ' on ' + save.date.toLocaleDateString("en-US") + '</p>';
		html += add;
	}
	$("#saveHistory").html(html);
}


//action functions
function updateTitle() {
	var x = $("#titleTF");
	if(x.val() == "") {
		$("#title").html(x.attr('placeholder'));
	}
	else {
		$("#title").html(x.val());
	}
}

function saved() {
	window.alert("Your Proposal has been saved!");
	saveHistory.push(new Version("John Smith", new Date(Date.now())));
	updateSaveHistory();
}

function softApprove(elmnt) {
	var elmntNum = elmnt.parentElement.parentElement.parentElement.rowIndex;
	if(validators[elmntNum].approved == 0) {
		validators[elmntNum].approved = 1;
		updateApprovalTable();
	}
}

function hardApprove() {
	validators[0].approved = 2;
	updateApprovalTable();
}

function updateName() {
	for(var index in validators) {
		var name = document.getElementsByClassName("validatorName")[index].value;
		validators[index].name = name;
	}
	updateApprovalTable();
}

function addValidator() {
	var title = prompt("Enter the Title of an additional Validator:");
	if(title.replace(/\s/g, '') != "") {
		validators.push(new index(title, "", 0));
		run();
	}
}


