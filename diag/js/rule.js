String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

window.onload = function() {

	// 質問リスト(titleImage: 質問画像、fstAnswer: 一つ目の回答、sndAnswer: 二つ目の回答)
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

	// 商品リスト(fileName: 商品画像名、url: リンク先)
	var goodsList = {
		goods01: { fileName: 'goods_01.png', url: 'http://item.rakuten.co.jp/cerapure/kl-01/#cart' },
		goods02: { fileName: 'goods_02.png', url: 'http://item.rakuten.co.jp/cerapure/ka-02/#cart' },
		goods03: { fileName: 'goods_03.png', url: 'http://item.rakuten.co.jp/cerapure/ka-01/#cart' },
		goods04: { fileName: 'goods_04.png', url: 'http://item.rakuten.co.jp/cerapure/kf-03/#cart' },
		goods05: { fileName: 'goods_05.png', url: 'http://item.rakuten.co.jp/cerapure/kf-01/#cart' },
		goods06: { fileName: 'goods_06.png', url: 'http://item.rakuten.co.jp/cerapure/kf-04/#cart' },
		goods07: { fileName: 'goods_07.png', url: 'http://item.rakuten.co.jp/cerapure/kf-06/#cart' },
		goods08: { fileName: 'goods_08.png', url: 'http://item.rakuten.co.jp/cerapure/kf-02/#cart' }
	};

	// 商品表示パターン(表示順番)
	var goodsPattern = {
		a:   [ goodsList.goods05, goodsList.goods06, goodsList.goods07, goodsList.goods08 ],
		aa:  [ goodsList.goods04, goodsList.goods05, goodsList.goods07, goodsList.goods08 ],
		b:   [ goodsList.goods05, goodsList.goods06, goodsList.goods07 ],
		bb:  [ goodsList.goods04, goodsList.goods05, goodsList.goods07 ],
		sb:  [ goodsList.goods06, goodsList.goods07, goodsList.goods08 ],
		sbb: [ goodsList.goods04, goodsList.goods07, goodsList.goods08 ],
		c:   [ goodsList.goods06, goodsList.goods07 ],
		cc:  [ goodsList.goods04, goodsList.goods07 ],
		wa:  [ goodsList.goods01, goodsList.goods02, goodsList.goods03, goodsList.goods05 ],
		wb:  [ goodsList.goods02, goodsList.goods03, goodsList.goods05 ],
		swb: [ goodsList.goods01, goodsList.goods02, goodsList.goods03 ],
		wc:  [ goodsList.goods02, goodsList.goods03 ]
	};

	// 診断結果パータン(result: 結果、status: あなたの状態、advice: アドバイス、allUrl: まとめて購入リンク先)
	var resultPattern = {
		a:   { result: 'result_02.png', status: 'status_01.png', advice: 'adv_01.png', 
				allUrl: 'http://item.rakuten.co.jp/cerapure/ks-c/#cart' },
		aa:  { result: 'result_04.png', status: 'status_03.png', advice: 'adv_03.png', 
				allUrl: 'http://item.rakuten.co.jp/cerapure/ks-d/#cart'},
		b:   { result: 'result_03.png', status: 'status_02.png', advice: 'adv_02.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/ktk-a/#cart' },
		bb:  { result: 'result_05.png', status: 'status_02.png', advice: 'adv_04.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/ktk-b/#cart' },
		sb:  { result: 'result_05.png', status: 'status_04.png', advice: 'adv_04.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/km-c/#cart' },
		sbb: { result: 'result_07.png', status: 'status_04.png', advice: 'adv_08.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/km-d/#cart' },
		c:   { result: 'result_08.png', status: 'status_06.png', advice: 'adv_07.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/ke-a/#cart' },
		cc:  { result: 'result_09.png', status: 'status_06.png', advice: 'adv_09.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/ke-c/#cart' },
		wa:  { result: 'result_01.png', status: 'status_05.png', advice: 'adv_05.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/kis-e/#cart' },
		wb:  { result: 'result_06.png', status: 'status_05.png', advice: 'adv_05.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/ktk-e/#cart' },
		swb: { result: 'result_10.png', status: 'status_07.png', advice: 'adv_10.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/kio-e/#cart' },
		wc:  { result: 'result_11.png', status: 'status_08.png', advice: 'adv_11.png',
				allUrl: 'http://item.rakuten.co.jp/cerapure/ka-st/#cart' }
	};

	// 結果判定ルール(result: 結果パターン、goods:　商品表示パターン)
	var rules = {
		"AAA-A-A-AA": { num: '01', result: resultPattern.a,   goods: goodsPattern.a   },
		"AAA-A-A-BA": { num: '02', result: resultPattern.a,   goods: goodsPattern.a   },
		"AAA-A-B--A": { num: '03', result: resultPattern.b,   goods: goodsPattern.b   },
		"AAB-A-A-AA": { num: '04', result: resultPattern.aa,  goods: goodsPattern.aa  },
		"AAB-A-A-BA": { num: '05', result: resultPattern.sb,  goods: goodsPattern.aa  },
		"AAB-A-B--A": { num: '06', result: resultPattern.aa,  goods: goodsPattern.sb  },
		"AAB-B-A-AA": { num: '07', result: resultPattern.aa,  goods: goodsPattern.aa  },
		"AAB-B-A-BA": { num: '08', result: resultPattern.aa,  goods: goodsPattern.aa  },
		"AAB-B-B--A": { num: '09', result: resultPattern.bb,  goods: goodsPattern.bb  },
		"ABA---A-AA": { num: '10', result: resultPattern.a,   goods: goodsPattern.a   },
		"ABA---A-BA": { num: '11', result: resultPattern.a,   goods: goodsPattern.a   },
		"ABA---B--A": { num: '12', result: resultPattern.b,   goods: goodsPattern.b   },
		"ABB---A-AA": { num: '13', result: resultPattern.a,   goods: goodsPattern.a   },
		"ABB---A-BA": { num: '14', result: resultPattern.a,   goods: goodsPattern.a   },
		"ABB---B--A": { num: '15', result: resultPattern.b,   goods: goodsPattern.b   },
		"BAA---A--A": { num: '16', result: resultPattern.wa,  goods: goodsPattern.wa  },
		"BAA---B--A": { num: '17', result: resultPattern.wb,  goods: goodsPattern.wb  },
		"BAB---A--A": { num: '18', result: resultPattern.wa,  goods: goodsPattern.wa  },
		"BAB---B--A": { num: '19', result: resultPattern.wb,  goods: goodsPattern.wb  },
		"BBA---A--A": { num: '20', result: resultPattern.wa,  goods: goodsPattern.wa  },
		"BBA---B--A": { num: '21', result: resultPattern.wb,  goods: goodsPattern.wb  },
		"BBB---A--A": { num: '22', result: resultPattern.wa,  goods: goodsPattern.wa  },
		"BBB---B--A": { num: '23', result: resultPattern.wb,  goods: goodsPattern.wb  },
		"AAA-A-A-AB": { num: '24', result: resultPattern.sb,  goods: goodsPattern.sb  },
		"AAA-A-A-BB": { num: '25', result: resultPattern.sb,  goods: goodsPattern.sb  },
		"AAA-A-B--B": { num: '26', result: resultPattern.c,   goods: goodsPattern.c   },
		"AAB-A-A-AB": { num: '27', result: resultPattern.sbb, goods: goodsPattern.sbb },
		"AAB-A-A-BB": { num: '28', result: resultPattern.sbb, goods: goodsPattern.sbb },
		"AAB-A-B--B": { num: '29', result: resultPattern.cc,  goods: goodsPattern.cc  },
		"AAB-B-A-AB": { num: '30', result: resultPattern.sbb, goods: goodsPattern.sbb },
		"AAB-B-A-BB": { num: '31', result: resultPattern.sbb, goods: goodsPattern.sbb },
		"AAB-B-B--B": { num: '32', result: resultPattern.cc,  goods: goodsPattern.cc  },
		"ABA---A-AB": { num: '33', result: resultPattern.sb,  goods: goodsPattern.sb  },
		"ABA---A-BB": { num: '34', result: resultPattern.sb,  goods: goodsPattern.sb  },
		"ABA---B--B": { num: '35', result: resultPattern.c,   goods: goodsPattern.c   },
		"ABB---A-AB": { num: '36', result: resultPattern.sb,  goods: goodsPattern.sb  },
		"ABB---A-BB": { num: '37', result: resultPattern.sb,  goods: goodsPattern.sb  },
		"ABB---B--B": { num: '38', result: resultPattern.c,   goods: goodsPattern.c   },
		"BAA---A--B": { num: '39', result: resultPattern.swb, goods: goodsPattern.swb },
		"BAA---B--B": { num: '40', result: resultPattern.wc,  goods: goodsPattern.wc  },
		"BAB---A--B": { num: '41', result: resultPattern.swb, goods: goodsPattern.swb },
		"BAB---B--B": { num: '42', result: resultPattern.wc,  goods: goodsPattern.wc  },
		"BBA---A--B": { num: '43', result: resultPattern.swb, goods: goodsPattern.swb },
		"BBA---B--B": { num: '44', result: resultPattern.wc,  goods: goodsPattern.wc  },
		"BBB---A--B": { num: '45', result: resultPattern.swb, goods: goodsPattern.swb },
		"BBB---B--B": { num: '46', result: resultPattern.wc,  goods: goodsPattern.wc  }
	};

	$("#question-section").empty();
	$("#question-template").tmpl({ list: questionList }).appendTo("#question-section");

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
            // 画面トップの戻る
			$("body").scrollTop(0);
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

		$("#result").empty();
		$("#result-template").tmpl(result).appendTo("#result");
	};
}