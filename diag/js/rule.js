String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
			// 選択結果保存

			var d = $(this).parent().parent().parent().attr("id");
            var g = parseInt(d.slice(8)) + 1;
            console.log("g=" + g);
            $("#" + d).hide();
            $("#question" + g).show();
            getPage("AAABAAABBC");
		}
	});

	var getPage = function(selected) {
		var rules = {
			"AAA-A-A-AA" : "1",
			"AAA-A-A-BA" : "2"
		};

		var result = 0;
		var format_rules = {};
		for(key in rules){
			if(selected.match(key.replaceAll("-", "\\D"))) {
				result = rules[key];
			}
		}

		console.log("result=" + result);
	}
}