const ResponseCode = {
    Success:    'success',
    Error:      'error'
};

/*
 * api呼び出し用ajaxラッピング関数
 * @param option $.ajaxオプション
 */
const ajax = function(option) {
    $.ajax({
        type: 'POST',
        url: option.url,
        data: JSON.stringify(option.data),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: option.success,
        beforeSend: function(jqXHR, settings) {
            // TODO ajax呼び出し前の処理をここに書けば、各イベント処理の中でいちいち呼び出さなくてもすむ
            // if(validateMstGrp($("[validateMstGrp]"))) { return false; }
            // if(validate($("[validate]"))) { return false; }
            
            // displayLoding();
            return true;
        },
        error: function(xhr){
            if (option.error == undefined) {
                var msg =  (xhr.responseJSON != undefined && xhr.responseJSON.message != undefined) ? 
                        xhr.responseJSON.message : 'システムエラー発生しました。';
                notify(NotifyType.Error, msg);
            } else {
                return option.error;
            }
        },
        complete: function(xhr, status) {

            // removeLoading();
            // validateResponse();
            if (xhr.status == 403) {
                alert("ログインしていません。再度ログインしてからご利用ください。");
                location.href = "login.html";
                return;
            }
            if ((xhr.responseJSON != undefined) && (xhr.responseJSON.responseCode != ResponseCode.Success)) { 
                notify(NotifyType.Error, xhr.responseJSON.responseMsg);
            }
        }
    });
};

/*
 * ファイルアップロード用
 * @param option $.ajaxオプション
 */
const ajaxUpload = function(option) {
    $.ajax({
        type: 'POST',
        url: option.url,
        data: option.data,
        // contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        processData: false,
        success: option.success,
        error: function(xhr){
            if (option.error == undefined) {
                var msg =  (xhr.responseJSON != undefined && xhr.responseJSON.message != undefined) ? 
                        xhr.responseJSON.message : 'システムエラー発生しました。';
                notify(NotifyType.Error, msg);
            } else {
                return option.error;
            }
        }
    });   
}

/*
 * Loadingイメージ表示関数
 */
const displayLoding = function() {
    // ローディング画像が表示されていない場合のみ表示
    if($("#loading").length == 0){
        $("body").append("<div id='loading'></div>");
    } 
}
 
/*
 * Loadingイメージ削除関数
 */
const removeLoading = function() {
    $("#loading").remove();
}

/*
 * お知らせタイプ
 */
const NotifyType = {
    Error:      'error',
    Success:    'success' 
};

/*
 * メッセージ表示クリア
 */
const clearNotify =  function() {
    if ($("#notify").length > 0) {
        $("#notify").hide();
    }
}

/*
 * メッセージ表示(alertの代わりに作りました)
 * @param type メッセージタイプ
 * @param msg  メッセージ内容
 */
const notify = function(type, msg) {

    if ($("#notify").length < 1) {
        $("body").append("<div id='notify' class='alert'>" +
            "<button type='button' class='close' data-dismiss='alert'>&times;</button><strong>" +
            msg + "</strong></div>");
    }

    if (type == NotifyType.Error) {
        $("#notify").addClass("alert-danger");
        $("#notify").removeClass("alert-success");
    } else {
        $("#notify").addClass("alert-success");
        $("#notify").removeClass("alert-danger");
    }

    // 5秒後自動的に消します
    setTimeout(clearNotify, 5000);
}

/*
 * エラー表示
 * @param  チェック対象要素リスト
 * @return true:エラーあり、false:エラーなし
 */
var displayError = function(target, msg) {
    
    // エラー文言表示ターゲット取得
    var errorDiv = $(target).parent().find(".error");
    if (errorDiv.length < 1 && !isNull($(target).attr("error-display"))) {
        errorDiv = $("#" + $(target).attr("error-display"));
    } else if (errorDiv.length < 1) {
        $(target).parent().append("<div class='error'></div>");
        errorDiv = $(target).parent().find(".error");
    }
    $(errorDiv).text(msg);

    if ($(target).prop("tagName") == "INPUT" || $(target).prop("tagName") == "SELECT") {
        $(target).addClass("input-error");
    }

    // 再度入力された際に、エラー表示解除
    if ($(target).attr("validate").indexOf(ValidateType.phone) > -1) { return true; }
    $(target).on('change', function() {
        if ($(target).hasClass('input-error')) {
            $(target).removeClass('input-error');
        }
        if ($(errorDiv).hasClass('error')) {
            $(errorDiv).text('');
            $(errorDiv).removeClass('input-error');
        }
    });
    return true;
}

const ValidateType = {
    required:       'required',
    email:          'email',
    phone:          'phone'
};

const validate = function(target) {

    /*
     * 必須チェック
     */
    var required = function(target) {
        var value = $(target).val();
        if (isNull(value)) {
            var errorMsg = 
                $(target).attr(ValidateType.required + "-msg") ? 
                    $(target).attr(ValidateType.required + "-msg") : "必須項目";
            return displayError(target, errorMsg);
        }
        return false;
    };

    var email = function(target) {
        var value = $(target).val();
        if (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null) {
            var errorMsg =
                isNull($(target).attr(ValidateType.email + "-msg")) ? 
                    "メールアドレスを正しく入力してください。" : $(target).attr(ValidateType.email + "-msg");
            return displayError(target, errorMsg);
        }
        return false;
    }

    var phone = function(target) {
        var value = $(target).val();
        if (!isNull(value)) {
            if (value.length < 10 || value.length > 13) {
                return displayError(target, "一般的な桁数と一致しません。修正をお願いします");
            }
        }
        return false;
    }

    // ----------------
    //    処理開始
    // ----------------
    if (target.length < 1) { return false; }
    var errorFlag = false;

    $.each(target, function(index, element){
        console.log("value=" + $(this).val() + ",validate=" + $(this).attr("validate"));
        // 非表示の場合チェックしない
        // if (!$(this).is(":visible")) { return true; }
        var str = $(this).attr("validate");
        var value = $(this).val();
        $.each(str.split(","), function(i, e){
            switch (e) {
                case ValidateType.required:
                    errorFlag = required(element);
                    break;
                case ValidateType.email:
                    errorFlag = email(element);
                    break;
                case ValidateType.phone:
                    errorFlag = phone(element);
                    break;
            }
            // eachループbreak判定
            if (errorFlag) { return false; }
        });
        // eachループbreak判定
        if (errorFlag) { return false; }
    });
    return errorFlag;
};

/*
 * Null判定
 * @return true: null,false: not null
 */
const isNull = function(obj) {
    if (obj == undefined || (obj != undefined && obj.length < 1)) {
        return true;
    } else {
        return false;
    }
};