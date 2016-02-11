/**
 * L'utilisateur classique et toutes ses informations disponibles
 * @param id L'id de la session de l'utilisateur
 * @param right Les droits de l'utilisateur enregistre
 */
function userPrototype(id,right,name) {
	this.id = id;
	this.right = right;
	this.name = name;
	this.project = [];
	this.sessionID="none";

	this.addProject = function(newIdProject) {
		console.log(newIdProject);
		this.project.push(newIdProject);
	}
	
	/**
	 * Permet de creer l'utilisateur
	 */
	this.setUser = function(id,right,name,project,sessionID) {
		this.id = id;
		this.right = right;
		this.name = name;		
		this.project = project.slice();
		this.sessionID=sessionID;
	}
	
	/**
	 * Permet de reset l'utilisateur
	 */
	this.reset = function() {
		this.id = "";
		this.right = "";
		this.name = "";
	}
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}