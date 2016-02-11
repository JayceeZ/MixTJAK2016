var user = new userPrototype(readCookie('sessionID'),"azeaeaze","Latsuj");
var project;
// Si j'ai un projet en cours...

/**
 * For opening the navigation explorer of windows
 */
$("#plus").click(function() {
	$("#select-files").click();
});

/**
 * For skipping the problem with the val
 */
$("#select-files").change(function() {
	plus();
});

$(".wave").find("wave").change(function() {
	console.log("azeazee");
});

var tracks = 0;
var waveList = [];
var regionList = [];
var tableFilters = [];

function initTracks(nbr) {
		$.get("pages/track.html", function (data) {
	        $("#track").append(data);
	        var progressDiv = document.querySelector('#progress-bar');
	        var progressBar = progressDiv.querySelector('.progress-bar');

	        var showProgress = function (percent) {
	            progressDiv.style.display = 'block';
	            progressBar.style.width = percent + '%';
	        };

	        var hideProgress = function () {
	            progressDiv.style.display = 'none';
	        };
	        
			var wavesurfer = Object.create(WaveSurfer);
			wavesurfer.init({
			    container: document.querySelector("#wave"+tracks),
			    waveColor: "#00dfe7",
			    progressColor: "#1400d5",
			    cursorColor: "#000000",
			    fillParent: true
			});
			
			wavesurfer.on('loading', showProgress);
			wavesurfer.load(ADDR_SERVER+"/"+project.getTrack(tracks));
			wavesurfer.on('ready',function() {
				hideProgress();
				initWave();
				addNewRegion(tracks);
				tracks++;
				if(tracks<project.nbrTrack) {		
					initTracks(tracks);
				}
			});
			waveList.push(wavesurfer);
	    });
}

function setRegionStart(obj) {
	if(user.id==project.user || user.right==RIGHT_GOD) {
		nbrTrack = parseInt($(obj).closest(".track").data("track"));
		var cal = $(obj).val()*waveList[nbrTrack].getDuration()/100;
		if($(obj).val()<project.getEnd(nbrTrack)) {
			regionList[nbrTrack].update({
				start: cal
			});	
			project.setRegion(nbrTrack,$(obj).val(),project.getEnd(nbrTrack));
		} else {
			$("#track"+nbrTrack).find(".regionStart").val(project.getEnd(nbrTrack)-1);
			project.setRegion(nbrTrack,project.getEnd(nbrTrack)-1,project.getEnd(nbrTrack));
		}
		project.save();
	} else {
		writingInfo("Vous n'etes pas autorise a modifier ce projet !");
	}
}	

function setRegionEnd(obj) {
	if(user.id==project.user || user.right==RIGHT_GOD) {
		nbrTrack = parseInt($(obj).closest(".track").data("track"));
		var cal = $(obj).val()*waveList[nbrTrack].getDuration()/100;
		console.log(nbrTrack);
		console.log(regionList);
		if($(obj).val()<100) {
			regionList[nbrTrack].update({
				end: cal
			});	
			project.setRegion(nbrTrack,project.getStart(nbrTrack),$(obj).val());
		} else {
			if($(obj).val()<=0) {
				$("#track"+nbrTrack).find(".regionEnd").val(0);
				project.setRegion(nbrTrack,project.getStart(nbrTrack),0);
				regionList[nbrTrack].update({
					end: 0
				});	
				project.setRegion(nbrTrack,project.getStart(nbrTrack),0);
			}
		}
		project.save();
	} else {
		writingInfo("Vous n'etes pas autorise a modifier ce projet !");
	}
}

function addNewRegion(position) {
	var start = project.getStart(position)*waveList[position].getDuration()/100;
	var end = project.getEnd(position)*waveList[position].getDuration()/100;
	if(user.id==project.user || user.right==RIGHT_GOD) {
		var region = waveList[position].addRegion({
			start:start,
			end:end,
			drag: true,
			loop:true,
			color: "rgba(0, 0, 0, 0.1)"
		});		
	} else {
		var region = waveList[position].addRegion({
			start:start,
			end:end,
			drag: false,
			loop:true,
			color: "rgba(0, 0, 0, 0.1)"
		});			
	}
	console.log("HAHAHA");
	regionList.push(region);
	$("#track"+position).find(".regionStart").val(project.getStart(position));
	$("#track"+position).find(".regionEnd").val(project.getEnd(position));
}

function addNewFilters(position) {
	var f32 = waveList[position].backend.ac.createBiquadFilter();
	f32.type = 'lowshelf';
	f32.gain.value = project.getFilter(position,0);
	f32.Q.value = 1;
	f32.frequency.value = 32;		
	
	var f64 = waveList[position].backend.ac.createBiquadFilter();
	f64.type = 'peaking';
	f64.gain.value = project.getFilter(position,1);
	f64.Q.value = 1;
	f64.frequency.value = 64;			
	
	var f125 = waveList[position].backend.ac.createBiquadFilter();
	f125.type = 'peaking';
	f125.gain.value = project.getFilter(position,2);
	f125.Q.value = 1;
	f125.frequency.value = 125;		
	
	var f250 = waveList[position].backend.ac.createBiquadFilter();
	f250.type = 'peaking';
	f250.gain.value = project.getFilter(position,3);
	f250.Q.value = 1;
	f250.frequency.value = 250;		
	
	var f500 = waveList[position].backend.ac.createBiquadFilter();
	f500.type = 'peaking';
	f500.gain.value = project.getFilter(position,4);
	f500.Q.value = 1;
	f500.frequency.value = 500;	
	
	var f1000 = waveList[position].backend.ac.createBiquadFilter();
	f1000.type = 'peaking';
	f1000.gain.value = project.getFilter(position,5);
	f1000.Q.value = 1;
	f1000.frequency.value = 1000;
	
	var f2000 = waveList[position].backend.ac.createBiquadFilter();
	f2000.type = 'peaking';
	f2000.gain.value = project.getFilter(position,6);
	f2000.Q.value = 1;
	f2000.frequency.value = 2000;	
	
	var f4000 = waveList[position].backend.ac.createBiquadFilter();
	f4000.type = 'peaking';
	f4000.gain.value = project.getFilter(position,7);
	f4000.Q.value = 1;
	f4000.frequency.value = 4000;
	
	var f8000 = waveList[position].backend.ac.createBiquadFilter();
	f8000.type = 'peaking';
	f8000.gain.value = project.getFilter(position,8);
	f8000.Q.value = 1;
	f8000.frequency.value = 8000;	

	var f16000 = waveList[position].backend.ac.createBiquadFilter();
	f16000.type = 'highshelf';
	f16000.gain.value = project.getFilter(position,9);
	f16000.Q.value = 1;
	f16000.frequency.value = 16000;	
	
	var fg = waveList[position].backend.ac.createGain();
	fg.gain.value = project.getFilter(position,10);
	
	var cp = waveList[position].backend.ac.createPanner();
	cp.setPosition(project.getFilter(position,11),0,0);
	
	
	var dt = waveList[position].backend.ac.createWaveShaper();
	dt.curve = makeDistortionCurve(0);
	dt.oversample = '4x';

	var speed = waveList[position].backend.ac.createWaveShaper();
	
	var filters = [f32,f64,f125,f250,f500,f1000,f2000,f4000,f8000,f16000,fg,cp,dt,speed];
	
	tableFilters.push(filters);
	
    waveList[tracks].backend.setFilters(tableFilters[tracks]);
    waveList[tracks].filters = tableFilters[tracks];
    var obj;
    for(var i=0;i<NBR_FILTRES;i++) {
    	setFilterTracks(tracks,i);
    }
}

/**
 * Initialise la wave en fonction des local storage
 */
function initWave() {
	addNewFilters(tracks);
}

function makeDistortionCurve(amount) {
	  var k = typeof amount === 'number' ? amount : 50,
	    n_samples = 44100,
	    curve = new Float32Array(n_samples),
	    deg = Math.PI / 180,
	    i = 0,
	    x;
	  for ( ; i < n_samples; ++i ) {
	    x = i * 2 / n_samples - 1;
	    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
	    //curve[i] = (1+k)*x/(1+k*Math.abs(x));
	  }
	  return curve;
	};
	
function setFiltre(obj) {
	if(user.id==project.user || user.right==RIGHT_GOD) {
		nbrTrack = parseInt($(obj).closest(".track").data("track"));
		nbrFilter = parseInt($(obj).data("filter"));
		nbrValue = parseFloat($(obj).val());
		console.log(nbrValue);
		project.setFilter(nbrTrack,nbrFilter,nbrValue);
		project.save();
		setFilterTracks(nbrTrack,nbrFilter);
	} else {
		writingInfo("Vous n'etes pas autorise a modifier ce projet !");
	}
}

/**
 * set Bande de frequence 8000
 * @param nbr
 */
function setFilterTracks(nbrTrack,nbrFiltre) {
	if(nbrFiltre<11) {
		tableFilters[nbrTrack][nbrFiltre].gain.value = project.getFilter(nbrTrack,nbrFiltre);
	} else if(nbrFiltre == 11){
		tableFilters[nbrTrack][nbrFiltre].setPosition(project.getFilter(nbrTrack,11),0,0);
	} else if(nbrFiltre == 12){
		tableFilters[nbrTrack][12].curve = makeDistortionCurve(project.getFilter(nbrTrack,12));
	} else if(nbrFiltre = 13) {
		waveList[nbrTrack].setPlaybackRate(project.getFilter(nbrTrack,13));
	}
	$("#track"+nbrTrack).find("#filter"+nbrFiltre).val(project.getFilter(nbrTrack,nbrFiltre));
}

function plus() {
	if(user.id==project.user || user.right==RIGHT_GOD) {
	    $.get("pages/track.html", function (data) {
	    	file = $("#select-files").get(0).files[0];
		    var link = saveSong(file);
	        $("#track").append(data);
			project.addTrack(link,[0,0,0,0,0,0,0,0,0,1,1,1,0,1],[0,5]);
	        
			var wavesurfer = Object.create(WaveSurfer);
			wavesurfer.init({
			    container: document.querySelector("#wave"+tracks),
			    waveColor: "#00dfe7",
			    progressColor: "#1400d5",
			    cursorColor: "#000000",
			    fillParent: true
			});
			
			wavesurfer.load(ADDR_SERVER+"/"+link);
			waveList.push(wavesurfer);
			addNewFilters(tracks);
			
			project.save();
			wavesurfer.on('ready',function() {
				addNewRegion(tracks);
				tracks++;
			});
	    });
	} else {
		writingInfo("Vous n'etes pas autorise a rajouter des fichiers !");
	}
}

var play = false;
$("#play").click(function() {
	playWave();
	play = true;
	$("#play").removeClass("btn-default");
	$("#play").addClass("btn-success");
	$("#pause").removeClass("btn-success");
	$("#pause").addClass("btn-default");
});
function playWave() {
	for(var i = 0;i<waveList.length;i++) {
		if(project.getEnd(i)-project.getStart(i)>0) {
			regionList[i].play();
			waveList[i].play();
		} else {
			waveList[i].play();	
		}
	}
	
}

$("#newproject").click(function() {
	if(project==null) {
		console.log(user);
		project = new projectPrototype(user.id,"",[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0]],[],[[0,5]],0);
		createProjectForServer();
		track=0;
	} else if(user.id==project.user) {
		removeAll();
		project = new projectPrototype(user.id,"",[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0]],[],[[0,5]],0);
		createProjectForServer();
		var name = newname;
		localStorage.clear();
		localStorage["IdProject"] = user.project[user.project.length-1];
		$("#listproject").append("<option value='"+name+"'>"+name+"</option>");
		$("#listproject").val(user.project[user.project.length-1]);
		project.save();
		console.log(JSON.parse(localStorage["Project"]));
	} else {
		writingInfo("Quitter le mode de lecture des projets pour ajouter un nouveau projet !");
	}
});

$("#removeproject").click(function() {
	if(user.id==project.user || user.right==RIGHT_GOD) {
		if($("#listproject").val()!=null) {
			removeProjectForServer(parseInt($("#listproject").val()));
			$("#listproject").empty();
			for(var i = 0;i<user.project.length;i++) {
				$("#listproject").append("<option value="+user.project[i]+">Project "+user.project[i]+"</option>");
			}
			if($("#listproject").val()!=null) {
				removeAll();
				localStorage["IdProject"] = $("#listproject").val();
				loadProjectFromServer(localStorage["IdProject"]);
				if(project.nbrTrack>0) {
					initTracks(0);
				}
				project.save();
			} else {
				removeAll();
				localStorage.clear();
			}
		}
	} else {
		writingInfo("Ce projet ne vous appartient pas, vous ne pouvez pas supprimer des morceaux !");
	}
});

$("select").change(function() {
	if(play) {
		stopWave();
		$("#play").removeClass("btn-success");
		$("#play").addClass("btn-default");
		$("#pause").removeClass("btn-success");
		$("#pause").addClass("btn-default");
	}
	removeAll();
	localStorage["IdProject"] = $("#listproject").val();
	$("#listproject").empty();
	for(var i = 0;i<user.project.length;i++) {
		$("#listproject").append("<option value="+user.project[i]+">Project "+user.project[i]+"</option>");
	}
	$("#listproject").val(localStorage["IdProject"]);
	loadProjectFromServer(localStorage["IdProject"]);
	if(project.nbrTrack>0) {
		initTracks(0);
	}
	project.save();
});

var allUser = [];
var otherProject = false;
$("#allproject").click(function() {
	if(play) {
		stopWave();
		$("#play").removeClass("btn-success");
		$("#play").addClass("btn-default");
		$("#pause").removeClass("btn-success");
		$("#pause").addClass("btn-default");
	}
	if(!otherProject) {
		project.save();
		$("#track").empty();
		allUser = [];
		loadAllProject();
		for(var i=0;i<allUser.length;i++) {
			for(var j=0;j<allUser[i]["projects"].length;j++) {
	    		if(j==allUser[i]["projects"].length-1 && i==allUser.length-1) {
	        		$("#track").append('<div class="row" style="background:#bbbbbb;height:50px;line-height:50px;border-top: 1px solid #000000;border-bottom: 1px solid #000000;"><div class="col-md-offset-3 col-md-1 nameUser">'+allUser[i]["username"]+'</div><div class="col-md-1 nameProject">'+allUser[i]["projects"][j]+'</div><div class="col-md-offset-1 col-md-2" style="line-height:50px;text-align: right;"><strong>charger project :</strong></div><div class="col-md-1" style="line-height:50px;"><button type="button" data-nameuser="'+allUser[i]["username"]+'" data-nameproject="'+allUser[i]["projects"][j]+'" class="btn btn-success" onclick="loadOtherProject(this)" aria-label="Left Align"><span class="glyphicon glyphicon-open-file" aria-hidden="true"></span></button></div></div>');  	
	    		} else {
	        		$("#track").append('<div class="row" style="background:#bbbbbb;height:50px;line-height:50px;border-top: 1px solid #000000;"><div class="col-md-offset-3 col-md-1 nameUser">'+allUser[i]["username"]+'</div><div class="col-md-1 nameProject">'+allUser[i]["projects"][j]+'</div><div class="col-md-offset-1 col-md-2" style="line-height:50px;text-align: right;"><strong>charger project :</strong></div><div class="col-md-1" style="line-height:50px;"><button type="button" class="btn btn-success" data-nameuser="'+allUser[i]["username"]+'" data-nameproject="'+allUser[i]["projects"][j]+'" onclick="loadOtherProject(this)" aria-label="Left Align"><span class="glyphicon glyphicon-open-file" aria-hidden="true"></span></button></div></div>');  
	    		} 
			}
		}
	    otherProject = true;
	} else {
		$("#track").empty();
		removeAll();
		$("#listproject").empty();
		for(var i = 0;i<user.project.length;i++) {
			$("#listproject").append("<option value="+user.project[i]+">Project "+user.project[i]+"</option>");
		}
		if(user.project.length>0) {
			localStorage["IdProject"] = user.project[0];
		}
		$("#listproject").val(localStorage["IdProject"]);
		loadProjectFromServer(0);
		if(project.nbrTrack>0) {
			initTracks(0);
		}
		project.save();
		otherProject = false;
	}
});

function loadOtherProject(obj) {
	if(play) {
		stopWave();
	}
	removeAll();
	$("#track").empty();
	$("#listproject").empty();
	$("#listproject").append("<option value="+$(obj).data("nameproject")+">"+$(obj).data("nameuser")+" - Project "+$(obj).data("nameproject")+"</option>");
	loadOtherProjectFromServer($(obj).data("nameuser"),$(obj).data("nameproject"));
	if(project.nbrTrack>0) {
		initTracks(0);
	}
}

$("#pause").click(function() {
	pauseWave();
	play = false;
	$("#play").removeClass("btn-success");
	$("#play").addClass("btn-default");
	$("#pause").addClass("btn-success");
	$("#pause").removeClass("btn-default");
});
function pauseWave() {
	for(var i = 0;i<waveList.length;i++) {
		waveList[i].pause();
	}
}

$("#stop").click(function() {
	stopWave();
	play = false;
	$("#play").removeClass("btn-success");
	$("#play").addClass("btn-default");
	$("#pause").removeClass("btn-success");
	$("#pause").addClass("btn-default");
});
function stopWave() {
	for(var i = 0;i<waveList.length;i++) {
		waveList[i].stop();
	}
}

function onTick(value) {
    $('#text1').html(value);
}

/**
 * Supprime une piste de l'application
 * @param obj La ligne que l'on supprime
 */
function removeWave(obj) {
	if(user.id==project.user || user.right==RIGHT_GOD) {
		var ct = parseInt($(obj).closest(".row").find(".wave").attr("id").slice(-1));
		waveList.splice(ct,1);
		regionList.splice(ct,1);
		tracks--;
		$("#track"+parseInt($(obj).data("track"))).remove();
		for(var i = ct+1;i<=waveList.length;i++) {
			$("#wave"+i).attr("id","wave"+(i-1));
			$("#track"+i).data("track",i-1);
			$("#track"+i).attr("id","track"+(i-1));
		}
		project.removeTrack(ct);
		project.save();
	} else {
		writingInfo("Ce projet ne vous appartient pas, vous ne pouvez pas supprimer des morceaux !");
	}
}

function removeAll() {
	for(var i = 0;i<tracks;i++) {
		$("#track"+i).remove();
	}
	tracks = 0;
	waveList = [];
	regionList = [];
	tableFilters = [];
	//localStorage.clear();
}

var tempo = false;
function writingInfo(message) {
	if(!tempo) {
		$("#indication").css("opacity","1");
		$("#indication").html(message);
		$("#indication").animate({opacity: "0"},5000,function() {
			tempo = false;
		});
		tempo = true;
	}
}







