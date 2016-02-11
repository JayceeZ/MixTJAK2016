/**
 * Script qui s'execute lorsque l'on appuie sur logout
 */
$("#logout").click(function() {
	deleteCookie('sessionID');
	user.reset();
	switchBetweenConnectedAndDisconnected();
});