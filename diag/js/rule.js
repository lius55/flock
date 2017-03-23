String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

window.onload = function() {

	// 質問リスト
	var questionList = [
		{ titleImage: 'qst_01.png', fstAnswer: 'ans_03.png', sndAnswer: 'ans_04.png' }
		// { titleImage: 'qst_02.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		// { titleImage: 'qst_03.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		// { titleImage: 'qst_04.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		// { titleImage: 'qst_05.png', fstAnswer: 'ans_07.png', sndAnswer: 'ans_08.png' },
		// { titleImage: 'qst_06.png', fstAnswer: 'ans_09.png', sndAnswer: 'ans_10.png' },
		// { titleImage: 'qst_07.png', fstAnswer: 'ans_11.png', sndAnswer: 'ans_10.png' },
		// { titleImage: 'qst_08.png', fstAnswer: 'ans_01.png', sndAnswer: 'ans_02.png' },
		// { titleImage: 'qst_09.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		// { titleImage: 'qst_10.png', fstAnswer: 'ans_12.png', sndAnswer: 'ans_13.png' }
	];

	// 結果判定ルール
	var rules = {
		"AAA-A-A-AA": 
			{ result: 'result_02.png', status: '', advice: '', goods: '' },
		"AAA-A-A-BA": 
			{  }
		"AAA-A-B--A":
		"AAB-A-A-AA":
		"AAB-A-A-BA":
		"AAB-A-B--A":
		"AAB-B-A-AA":
		"AAB-B-A-BA":
		"AAB-B-B--A":
		"ABA---A-AA":
		"ABA---A-BA":
		"ABA---B--A":
		"ABB---A-AA":
		"ABB---A-BA":
		"ABB---B--A":
		"BAA---A--A":
		"BAA---B--A":
		"BAB---A--A":
		"BAB---B--A":
		"BBA---A--A":
		"BBA---B--A":
		"BBB---A--A":
		"BBB---B--A":
		"AAA-A-A-AB":
		"AAA-A-A-BB":
		"AAA-A-B--B":
		"AAB-A-A-AB":
		"AAB-A-A-BB":
		"AAB-A-B--B":
		"AAB-A-A-AB":
		"AAB-A-A-BB":
		"AAB-A-B--B":
		"AAB-B-A-AB":
		"AAB-B-A-BB":
		"AAB-B-B--B":
		"ABA---A-AB":
		"ABA---A-BB":
		"ABA---B--B":
		"ABB---A-AB":
		"ABB---A-BB":
		"ABB---B--B":
		"BAA---A--B":
		"BAA---B--B":
		"BAB---A--B":
		"BAB---B--B":
		"BBA---A--B":
		"BBA---B--B":
		"BBB---A--B":
		"BBB---B--B":
	};


	// 診断質問DOM作成
	$.each(questionList, function(index, val){
		var num = parseInt(index + 1);
		$("#question-section").loadTemplate(
			$("#question-template"), {
				questionId: "question" + num,
				questionNum: "Q" + num + "/Q" + questionList.length,
				titleImage: "images/" + val.titleImage,
				fstAnswer: "images/" + val.fstAnswer,
				sndAnswer: "images/" + val.sndAnswer
		},{
			append: true
		});
	});

	var answerList = '';

	$("#typecheck").on("click", ".btn", function() {
		console.log("value=" + $(this).attr("value"));
		var value = $(this).attr("value");
		// 診断開始画面
		if(value == "start") {
			$("#start").hide();
			$("#question1").show();
			// 結果リスト初期化
			answerList = '';
		} else if(value == "restart") {
			var d = $(this).parent().parent().attr("id");
            $("#" + d).hide();
            $("#start").show();
		} else if(value == "A" || value == "B") {
			// 選択結果保存
			answerList += value;
			// 表示切り替え
			var d = $(this).parent().parent().parent().attr("id");
            var num = parseInt(d.slice(8)) + 1;
            console.log("num=" + num);

            $("#" + d).hide();
            if (num >= questionList.length) {
            	// getPage("AAABAAABBC");
            	// 結果判定
            	// 結果画面表示
            	$("#result").show();
            } else {
	            $("#question" + num).show();
            }
		}
	});

	var getPage = function(selected) {

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