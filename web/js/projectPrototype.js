/**
 * L'utilisateur classique et toutes ses informations disponibles
 * @param id L'id de la session de l'utilisateur
 * @param right Les droits de l'utilisateur enregistre
 */
function projectPrototype(user,name,filter,track,region,nbrTrack) {
	// L'user en question (venant d'un autre objet...Il a une id (un chiffre), un nom (une string), des droits (array style ["Ecriture","Lecture"]) 
	// et des projets (un array ["azeazeazeaze"]))
	this.user = user;
	// Nom du projet, une simple string, example : "azeazeazeaze"
	this.name = name;
	// Le tableau des filtres, example : [[10,0,0,0,0,0,0,0,0,0,1,0,0,1],[10,0,0,0,0,0,0,0,0,0,1,0,0,1]]
	this.filter = filter;
	// Le tableau des lien vers les fichiers de musiques, example : ["fx1.mp3","jayceez/fx12.mp3"]
	this.track = track;
	// Le tableau des regions des morceaux de musiques, example : [[0,60],[[90,100]]]
	// Poru info les numeros, represente des % par rapport a l'ensemble du morceau.
	this.region = region;
	// Le nombre de track, dans mon exemple : 2
	this.nbrTrack = nbrTrack;
	
	this.addTrack = function(newTrack,newFilter,newRegion) {
		this.filter.push(newFilter);
		this.track.push(newTrack);
		this.region.push(newRegion);
		this.nbrTrack++;
	}
	
	this.removeTrack = function(position) {
		this.filter.splice(position,1);
		this.track.splice(position,1);
		this.region.splice(position,1);
		this.nbrTrack--;
	}
	
	this.setName = function(name) {
		this.name = name;
	}
	
	this.getTrack = function(position) {
		return this.track[position];
	}
	
	this.getFilter = function(positionTrack,positionFilter) {
		return this.filter[positionTrack][positionFilter];
	}
	
	this.setRegion = function(positionTrack,positionStart,positionEnd) {
		this.region[positionTrack] = [positionStart,positionEnd];
	}
	
	this.getStart = function(positionTrack) {
		return this.region[positionTrack][0];
	}
	
	this.getEnd = function(positionTrack) {
		return this.region[positionTrack][1];
	}
	
	this.setFilter = function(positionTrack,positionFilter,value) {
		this.filter[positionTrack][positionFilter] = value;
	}
	
	this.save = function() {
		localStorage["Project"] = JSON.stringify(this);
		saveProjectForServer();
	}
	
	this.load = function() {
		if(localStorage.getItem("Project")!=null) {
			var tmp = JSON.parse(localStorage["Project"]);
			this.name = tmp.name;
			this.filter = tmp.filter.slice();
			this.track = tmp.track.slice();
			this.region = tmp.region.slice();
			this.nbrTrack = tmp.nbrTrack;
		}
	}
}