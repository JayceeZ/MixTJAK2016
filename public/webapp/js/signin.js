$("#signInOut").prop('disabled', true);

$("#signInOut").click(function() {
	var name = $("#usr").val();
	var pass = $("#pwd").val();
	registerUserForServer(name,pass);
	switchBetweenConnectedAndDisconnected();
});

$("#usr,#pwd,#pwd2").keyup(function() {
	if($("#usr").val()!="") {
		$('[data-toggle="usr"]').popover("hide");
		if($("#pwd").val()!="") {
			if($("#pwd2").val()!="") {
				if($("#pwd").val()==$("#pwd2").val()) {
					$('[data-toggle="pwd2"]').popover("hide");
					$('[data-toggle="pwd"]').popover("hide");
					$("#signInOut").prop('disabled', false);
				} else {
					$('[data-toggle="pwd2"]').popover("show");
					$('[data-toggle="pwd"]').popover("show");
					$("#signInOut").prop('disabled', true);
				}
			} else {
				$('[data-toggle="pwd2"]').popover("show");
				$("#signInOut").prop('disabled', true);
			}			
		} else {
			$('[data-toggle="pwd"]').popover("show");
			$("#signInOut").prop('disabled', true);
		}
	} else {
		$('[data-toggle="usr"]').popover("show");
		$("#signInOut").prop('disabled', true);
	}
});