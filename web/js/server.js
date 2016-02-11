/**
 * On load le projet de l'utilisateur a partir de son id (ID)
 * on me retourne un objet JSON contenant ("track","filter","region","nbrTrack")
 */
function loadProjectFromServer(idProject) {
	var track = [];
	var filter = [];
	var region = [];
	var nbrTrack = 0;
	$.ajax({
 		method: "GET",
 		url: ADDR_SERVER+"/project/"+idProject,
 		async: false,
 		dataType: "json",
 		success: function(data) {
			track = data["tracks"];
			filter = data["filters"];
			region = data["regions"];
			nbrTrack = data["nbrTracks"];
			project = new projectPrototype(user.id,idProject,filter,track,region,nbrTrack);
 		}
	});
}

function saveSong(file) {
	var link;
	var fd = new FormData();    
	fd.append( 'sound', file );
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/upload/sound",
 		async: false,
 		data: fd,
        processData: false,
        contentType: false,
 		dataType: "json",
 		success: function(data) {
 			console.log("aezaeaz");
			link = data;
 		}
	});
	return link;
}

function loadOtherProjectFromServer(nameUser,projectId) {
	/**
	var track = [];
	var filter = [];
	var region = [];
	var nbrTrack = 0;
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/getProject.html",
 		async: false,
 		data: { ID: user.id},
 		dataType: "json",
 		success: function(data) {
			track = data[0]["track"];
			filter = data[0]["filter"];
			region = data[0]["region"];
			nbrTrack = data[0]["nbrTrack"];;
 		}
	});
	**/
	//user.id = "azeazeazeaze";
	//project = new projectPrototype(user.id,projectId,[[10,0,0,0,0,0,0,0,0,0,1,0,0,1]],["fx1.mp3"],[[0,20]],1);
	project = new projectPrototype("azeazeazeaze",projectId,[[10,0,0,0,0,0,0,0,0,0,1,0,0,1]],["fx1.mp3"],[[20,40]],1);
}

function addProjectForServer() {
	var idProject = 1;
	/**
	var nbrTrack = 0;
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/addProjectUser.html",
 		async: false,
 		dataType: "json",
 		success: function(data) {
			idProject = data[0]["id"];
 		}
	});
	**/
	user.addProject(idProject);
	/**
	var nbrTrack = 0;
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/addProject.html",
 		async: false,
 		data: { ID: idProject},
 		dataType: "json",
 		success: function(data) {
 		}
	});
	**/
	project = new projectPrototype(user.id,idProject,[],[],[],0);
}

function loadAllProject() {
	$.ajax({
 		method: "GET",
 		url: ADDR_SERVER+"/users",
 		async: false,
 		dataType: "json",
 		success: function(data) {
 			allUser = data;
 		}
	});
}

function removeProjectForServer(idProject) {
	$.ajax({
 		method: "DELETE",
 		url: ADDR_SERVER+"/project/"+idProject,
 		async: false,
 		dataType: "json",
 		success: function(data) {
 		}
	});
	removeA(user.project,idProject);
}

/**
 * On enregistre les projets et l'user de l'utilisateur dans la base de donne
 */
var newname = "";
function createProjectForServer() {
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/project/save",
 		async: false,
 		data: { userId:project.user,tracks:project.track,filters:project.filter,regions:project.region},
 		dataType: "json",
 		success: function(data) {
 			project.setName(data);
 			newname = data;
 			console.log(project);
 		}
	});
}

/**
 * On enregistre les projets et l'user de l'utilisateur dans la base de donne
 */
function saveProjectForServer() {
	if(project.name!=1) {
		$.ajax({
	 		method: "POST",
	 		url: ADDR_SERVER+"/project/"+project.name,
	 		async: false,
	 		data: { userId:project.user,tracks:project.track,filters:project.filter,regions:project.region},
	 		dataType: "json",
	 		success: function(data) {
	 		}
		});
	} else {
		createProjectForServer();
	}
}

/**
 * Lorsque l'utilisateur enregistre un nouveau compte
 * Avec son nom d'utilisateur (NAME) et son mot de pass (PASS), on l'enregistre dans la base de donne
 * Puis on me renvoie son identifiant unique sous forme de json
 * @param name Le nom du nouvel utilisateur
 * @param pass Le pass de ce nouvel utilisateur
 */
function registerUserForServer(name,pass) {
	var id, right;
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/register",
 		data: { username: name, password: pass},
 		async: false,
 		dataType: "json",
 		success: function(data) {
 			id = data['id'];
 			right = data['right'];
 			user.setUser(id,right,name,[]);
 			writeCookie("sessionID", id, 3);
 		},
 		statusCode: {
		    401: function() {
		    	writingInfo("L'utilisateur avec ce pseudo existe deja !");
		    }
		}
	});
}

function getUserFromServerViaId(id) {
	$.ajax({
 		method: "GET",
 		url: ADDR_SERVER+"/user/"+id,
 		async: false,
 		dataType: "json",
 		success: function(data) {
 			name = data['name'];
 			right = data['rights'];
 			projects = data['projects'];
 			user.setUser(id,right,name,projects);
 			writeCookie("sessionID", id, 3);
 			console.log("BBBBB");
 			console.log(user);
 		}
	});
}

function getUserFromServer(name,pass) {
	var id;
	$.ajax({
 		method: "POST",
 		url: ADDR_SERVER+"/login",
 		async: false,
 		data: { username: name, password: pass},
 		dataType: "json",
 		success: function(data) {
 			user.setUser(data['id'],data['rights'],name,data['projects']);
 			writeCookie("sessionID", data['id'], 3);
 		}
	});
}






















