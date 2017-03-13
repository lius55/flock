window.onload = function() {
	$("#typecheck").on("click", ".btn", function() {
		console.log("value=" + $(this).attr("value"));
		var operation = $(this).attr("value");
		if(operation == "start") {
			$("#start").hide();
			$("#question1").show();
		} else if(operation == "back") {
			var d = $(this).parent().attr("id");
            $("#" + d).hide();
            $("#start").show();
		} else {
			var d = $(this).parent().parent().parent().attr("id");
            var g = parseInt(d.slice(8)) + 1;
            console.log("g=" + g);
            $("#" + d).hide();
            $("#question" + g).show();
		}
	});
}