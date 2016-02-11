function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
};

/**
 * Execute le changement lorsque l'utilisateur est connecte ou deconnecte
 */
function switchBetweenConnectedAndDisconnected() {
	if(user.id!==null && user.id!=="") {
		console.log("lalalala");
		$( "#connected-or-disconnected" ).load( "pages/connected.html",function() {
			$("#name").html(user.name);
			if(localStorage.getItem("Project")==null && localStorage.getItem("IdProject")==null) {
				console.log("CONNEXION");
				$("#listproject").empty();
				for(var i = 0;i<user.project.length;i++) {
					$("#listproject").append("<option value="+user.project[i]+">Project "+user.project[i]+"</option>");
				}
				if(user.project.length>0) {
					localStorage["IdProject"] = user.project[0];
				}
				console.log(user);
				if(user.project!=null && user.project.length>0) {
					loadProjectFromServer(user.project[0]);
					initTracks(0);
				}
				//project.save();
			}
		});
	} else {
		console.log("lolololo");
		//saveProjectForServer();
		removeAll();
		localStorage.clear();
		$( "#connected-or-disconnected" ).load( "pages/disconnected.html");
	}
}