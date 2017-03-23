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
		"AAA-A-A-AA": { 
			num: '01', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', 
			goods: '' },
		"AAA-A-A-BA": { 
			num: '02', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', 
			goods: '' },
		"AAA-A-B--A":
			{ num: '03', result: 'result_03.png', status: 'status_02.png', advice: 'adv_02.png', goods: '' },
		"AAB-A-A-AA":
			{ num: '04', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: '' },
		"AAB-A-A-BA":
			{ num: '05', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: '' },
		"AAB-A-B--A":
			{ num: '06', result: 'result_05.png', status: 'status_04.png', advice: 'adv_04.png', goods: '' },
		"AAB-B-A-AA":
			{ num: '07', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: '' },
		"AAB-B-A-BA":
			{ num: '08', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: '' },
		"AAB-B-B--A":
			{ num: '09', result: 'result_05.png', status: 'status_02.png', advice: 'adv_04.png', goods: '' },
		"ABA---A-AA":
			{ num: '10', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: '' },
		"ABA---A-BA":
			{ num: '11', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: '' },
		"ABA---B--A":
			{ result: 'result_03.png', status: 'status_04.png', advice: 'adv_02.png', goods: '' },
		"ABB---A-AA":
			{ result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: '' },
		"ABB---A-BA":
			{ result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: '' },
		"ABB---B--A":
			{ result: 'result_03.png', status: 'status_04.png', advice: 'adv_02.png', goods: '' },
		"BAA---A--A":
			{ result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BAA---B--A":
			{ result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BAB---A--A":
			{ result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BAB---B--A":
			{ result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BBA---A--A":
			{ result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BBA---B--A":
			{ result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BBB---A--A":
			{ result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"BBB---B--A":
			{ result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: '' },
		"AAA-A-A-AB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: '' },
		"AAA-A-A-BB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: '' },
		"AAA-A-B--B":
			{ result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png', goods: '' },
		"AAB-A-A-AB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: '' },
		"AAB-A-A-BB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: '' },
		"AAB-A-B--B":
			{ result: 'result_09.png', status: 'status_06.png', advice: 'adv_09.png', goods: '' },
		"AAB-A-A-AB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: '' },
		"AAB-A-A-BB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: '' },
		"AAB-A-B--B":
			{ result: 'result_09.png', status: 'status_06.png', advice: 'adv_09.png', goods: '' },
		"AAB-B-A-AB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: '' },
		"AAB-B-A-BB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: '' },
		"AAB-B-B--B":
			{ result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png', goods: '' },
		"ABA---A-AB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: '' },
		"ABA---A-BB":
			{ result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: '' },
		"ABA---B--B":
			{ result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png', goods: '' },
		"ABB---A-AB":
			{ result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: '' },
		"ABB---A-BB":
			{ result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: '' },
		"ABB---B--B":
			{ result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: '' },
		"BAA---A--B":
			{ result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: '' },
		"BAA---B--B":
			{ result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: '' },
		"BAB---A--B":
			{ result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: '' },
		"BAB---B--B":
			{ result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: '' },
		"BBA---A--B":
			{ result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: '' },
		"BBA---B--B":
			{ result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: '' },
		"BBB---A--B":
			{ result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: '' },
		"BBB---B--B":
			{ result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: '' }
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