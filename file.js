var API_BASE_URL = "http://localhost:8080";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "}
});


$("#button_list").click(function(e) {
	e.preventDefault();
	listFiles();
});

$("#button_post").click(function(e) {
	e.preventDefault();

    var newFile = new Object();
	newFile.name = $("#name").val();
	newFile.description = $("#surname").val();
	newFile.size=$("#mail").val();
	newFile.taglist=$("#password").val();	
	createFile(newFile);
});

$("#button_get").click(function(e) {
	e.preventDefault();
	getFile($("#mail").val());
});

$("#button_put").click(function(e) {
	e.preventDefault();

    var newFile = new Object();
	newFile.name = $("#name").val()
	newFile.description = $("#surname").val()
	newFile.description = $("#password").val()
	
	updateFile(newFile);
});

$("#button_delete").click(function(e) {
	e.preventDefault();
	deleteFile($("#file_name").val());
});

$("#button_pagination").click(function(e) {
	e.preventDefault();
});


function listFiles() {
	var url = API_BASE_URL + "/myapp/file/list";
	$("#result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var files = data.files;
				
				$.each(files, function(i, v) {
					var file = v;

					$('<br><strong> Name: ' + file.name + '</strong><br>').appendTo($('#result'));
					$('<strong> Surname: </strong> ' + file.surname + '<br>').appendTo($('#result'))
					$('<strong> Mail: </strong> ' + file.mail + '<br>').appendTo($('#result'));
				});
	}).fail(function() {
		$("#result").text("No files.");
	});

}

function createFile(file) {
	var url = API_BASE_URL + "/myapp/file";
	var file = JSON.stringify(file);

	$("#result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		contentType: "application/json; charset=utf-8", 
		data : file,
	}).done(function(file, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong>File Created</div>').appendTo($("#result"));	
		$('<strong> Name: </strong>' + file.name + '<br>').appendTo($('#result'));
		$('<strong> Surname: </strong> ' + file.surname + '<br>').appendTo($('#result'));
		$('<strong> Mail: </strong> ' + file.mail + '<br>').appendTo($('#result'));		
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});

}

function getFile(file_name) {
	var url = API_BASE_URL + '/myapp/file/' + file_name;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var file = data;

				$("#result").text('');
				$('<strong> Name: ' + file.name + '</strong>').appendTo($('#result'));
				$('<strong> Surname: </strong> ' + file.surname + '<br>').appendTo($('#result'));
				$('<strong> Mail: </strong> ' + file.mail + '<br>').appendTo($('#result'));


			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#get_repo_result"));
	});

}

function updateFile(file) {
	var url = API_BASE_URL + '/myapp/file/' + file.name;
	var data = JSON.stringify(file);
	$("#result").text('');
	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		contentType: "application/json; charset=utf-8", 
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> File Updated</div>').appendTo($("#result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});

}

function deleteFile(file_name) {
	var url = API_BASE_URL + '/myapp/file/' + file_name;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'Delete',
		crossDomain : true,
		dataType : 'json',
	}).accepted(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> File Deleted</div>').appendTo($("#result"))
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
	});

}
