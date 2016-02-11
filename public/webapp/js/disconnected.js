/**
 * Script qui s'execute lorsque l'on appuie sur login
 */
$("#login").click(function() {
	getUserFromServer($("#usr").val(),$("#pwd").val());
	switchBetweenConnectedAndDisconnected();
});

$("#signIn").click(function() {
	$( "#connected-or-disconnected" ).load( "pages/signin.html",function() {
		console.log("azeaze");
	});
});