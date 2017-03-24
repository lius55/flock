String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

window.onload = function() {

	// 質問リスト
	var questionList = [
		{ titleImage: 'qst_01.png', fstAnswer: 'ans_03.png', sndAnswer: 'ans_04.png' },
		{ titleImage: 'qst_02.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		{ titleImage: 'qst_03.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		{ titleImage: 'qst_04.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		{ titleImage: 'qst_05.png', fstAnswer: 'ans_07.png', sndAnswer: 'ans_08.png' },
		{ titleImage: 'qst_06.png', fstAnswer: 'ans_09.png', sndAnswer: 'ans_10.png' },
		{ titleImage: 'qst_07.png', fstAnswer: 'ans_11.png', sndAnswer: 'ans_10.png' },
		{ titleImage: 'qst_08.png', fstAnswer: 'ans_01.png', sndAnswer: 'ans_02.png' },
		{ titleImage: 'qst_09.png', fstAnswer: 'ans_05.png', sndAnswer: 'ans_06.png' },
		{ titleImage: 'qst_10.png', fstAnswer: 'ans_12.png', sndAnswer: 'ans_13.png' }
	];

	// 商品表示パターン
	var goodsPattern = {
		a:   'goods_05.png,goods_06.png,goods_07.png,goods_08.png',
		aa:  'goods_04.png,goods_05.png,goods_07.png,goods_08.png',
		b:   'goods_05.png,goods_06.png,goods_07.png',
		bb:  'goods_04.png,goods_05.png,goods_07.png',
		sb:  'goods_06.png,goods_07.png,goods_08.png',
		sbb: 'goods_04.png,goods_07.png,goods_08.png',
		c:   'goods_06.png,goods_07.png',
		cc:  'goods_04.png,goods_07.png',
		wa:  'goods_01.png,goods_02.png,goods_03.png,goods_05.png',
		wb:  'goods_02.png,goods_03.png,goods_05.png',
		swb: 'goods_01.png,goods_02.png,goods_03.png',
		wc:  'goods_02.png,goods_03.png'
	}

	// 結果判定ルール
	var rules = {
		"AAA-A-A-AA": { num: '01', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: goodsPattern.a   },
		"AAA-A-A-BA": { num: '02', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: goodsPattern.a   },
		"AAA-A-B--A": { num: '03', result: 'result_03.png', status: 'status_02.png', advice: 'adv_02.png', goods: goodsPattern.b   },
		"AAB-A-A-AA": { num: '04', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: goodsPattern.aa  },
		"AAB-A-A-BA": { num: '05', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: goodsPattern.aa  },
		"AAB-A-B--A": { num: '06', result: 'result_05.png', status: 'status_04.png', advice: 'adv_04.png', goods: goodsPattern.sb  },
		"AAB-B-A-AA": { num: '07', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: goodsPattern.aa  },
		"AAB-B-A-BA": { num: '08', result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', goods: goodsPattern.aa  },
		"AAB-B-B--A": { num: '09', result: 'result_05.png', status: 'status_02.png', advice: 'adv_04.png', goods: goodsPattern.bb  },
		"ABA---A-AA": { num: '10', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: goodsPattern.a   },
		"ABA---A-BA": { num: '11', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: goodsPattern.a   },
		"ABA---B--A": { num: '12', result: 'result_03.png', status: 'status_04.png', advice: 'adv_02.png', goods: goodsPattern.b   },
		"ABB---A-AA": { num: '13', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: goodsPattern.a   },
		"ABB---A-BA": { num: '14', result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', goods: goodsPattern.a   },
		"ABB---B--A": { num: '15', result: 'result_03.png', status: 'status_04.png', advice: 'adv_02.png', goods: goodsPattern.b   },
		"BAA---A--A": { num: '16', result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wa  },
		"BAA---B--A": { num: '17', result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wb  },
		"BAB---A--A": { num: '18', result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wa  },
		"BAB---B--A": { num: '19', result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wb  },
		"BBA---A--A": { num: '20', result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wa  },
		"BBA---B--A": { num: '21', result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wb  },
		"BBB---A--A": { num: '22', result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wa  },
		"BBB---B--A": { num: '23', result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png', goods: goodsPattern.wb  },
		"AAA-A-A-AB": { num: '24', result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: goodsPattern.sb  },
		"AAA-A-A-BB": { num: '25', result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: goodsPattern.sb  },
		"AAA-A-B--B": { num: '26', result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png', goods: goodsPattern.c   },
		"AAB-A-A-AB": { num: '27', result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: goodsPattern.sbb },
		"AAB-A-A-BB": { num: '28', result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: goodsPattern.sbb },
		"AAB-A-B--B": { num: '29', result: 'result_09.png', status: 'status_06.png', advice: 'adv_09.png', goods: goodsPattern.cc  },
		"AAB-B-A-AB": { num: '30', result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: goodsPattern.sbb },
		"AAB-B-A-BB": { num: '31', result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png', goods: goodsPattern.sbb },
		"AAB-B-B--B": { num: '32', result: 'result_09.png', status: 'status_06.png', advice: 'adv_09.png', goods: goodsPattern.cc  },
		"ABA---A-AB": { num: '33', result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: goodsPattern.sb  },
		"ABA---A-BB": { num: '34', result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: goodsPattern.sb  },
		"ABA---B--B": { num: '35', result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png', goods: goodsPattern.c   },
		"ABB---A-AB": { num: '36', result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: goodsPattern.sb  },
		"ABB---A-BB": { num: '37', result: 'result_07.png', status: 'status_04.png', advice: 'adv_06.png', goods: goodsPattern.sb  },
		"ABB---B--B": { num: '38', result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png', goods: goodsPattern.c   },
		"BAA---A--B": { num: '39', result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: goodsPattern.swb },
		"BAA---B--B": { num: '40', result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: goodsPattern.wc  },
		"BAB---A--B": { num: '41', result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: goodsPattern.swb },
		"BAB---B--B": { num: '42', result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: goodsPattern.wc  },
		"BBA---A--B": { num: '43', result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: goodsPattern.swb },
		"BBA---B--B": { num: '44', result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: goodsPattern.wc  },
		"BBB---A--B": { num: '45', result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png', goods: goodsPattern.swb },
		"BBB---B--B": { num: '46', result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png', goods: goodsPattern.wc  }
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

	// 選択結果
	var answerList = '';
	// ボタンクリックイベントハンドラー
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

            // 現在ページ非表示
            $("#" + d).hide();
            if (num > questionList.length) {
            	// 結果判定
            	// 結果画面表示
            	showResultPage(answerList, rules);
            	$("#result").show();
            } else {
            	// 次のページ表示
	            $("#question" + num).show();
            }
		}
	});

	// 診断結果ページ表示
	var showResultPage = function(answerList, rules) {

		console.log("answerList=" + answerList);
		var result = '';
		for(key in rules){
			if(answerList.match(key.replaceAll("-", "\\D"))) {
				result = rules[key];
			}
		}
		console.log("result=" + result);

		// goodsList表示内容作成
		var getGoodsList = function(goodsList) {
			console.log("goodsList=" + goodsList);
			var content = '';
			$.each(goodsList.split(','), function(index, imageName){
				var stempNum = parseInt(index + 1);
				content += "<div class='goods' "
					+ " style='background: url(images/" 
					+ imageName + ") center top no-repeat;'>" 
					+ "step" + stempNum+ "</div>";
			});
			return content;
		};

		$("#result").loadTemplate(
			$("#result-template"), {
				result: "images/" + result.result,
				status: "images/" + result.status,
				advice: "images/" + result.advice,
				goodsList: getGoodsList(result.goods)
			}
		);
	};
}