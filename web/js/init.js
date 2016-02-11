switchBetweenConnectedAndDisconnected();

//console.log(user);
//console.log(localStorage.getItem("Project"));
//project!=null && project.nbrTrack>0 && 
console.log(localStorage.getItem("Project"));
if(localStorage.getItem("Project")!=null && user.id!=null && user.id!="") {
	removeAll();
	project = new projectPrototype(user.id,"",[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0]],[],[[0,5]],0);
	project.load();
	getUserFromServerViaId(user.id);
	console.log("HAHAHAHAHA");
	console.log(user);
	$("#listproject").empty();
	for(var i = 0;i<user.project.length;i++) {
		$("#listproject").append("<option value="+user.project[i]+">Project "+user.project[i]+"</option>");
	}
	if(localStorage.getItem("IdProject")!=null) {
		$("#listproject").val(localStorage["IdProject"]);
	}
	if(project.nbrTrack>0) {
		initTracks(0);
	}	
	project.save();
}