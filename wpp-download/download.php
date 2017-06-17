<?php
/*
Plugin Name: ユーザ保証情報管理
Plugin URI: 
Description: 登録されたユーザ保証情報ダ管理するプラグインです
Author: tony
Version: 0.1
Author URI: 
*/
class Download {
	function __construct() {
		add_action('admin_menu', array($this, 'add_pages'));
	}
	function add_pages() {
        $user_info_manage = __FILE__;
        add_menu_page('ユーザ保証情報管理', 'ユーザ保証情報管理',  'level_8', $user_info_manage, array($this,'show_download_page'), '');
        add_submenu_page($user_info_manage, 
            'ダウンロード', 'ダウンロード', 'level_8', $user_info_manage, array($this,'show_download_page'));
        add_submenu_page($user_info_manage, 
            '追加', '追加', 'level_8', $user_info_manage.'_add', array($this, 'show_add_page'));
    }
    function show_download_page() {
        // ------------------------------
	    //　画面に表示する内容
	    ?>
        <script src="<?php echo plugins_url('js/jquery.min.js', __FILE__); ?>"></script>
	    <div class="wrap">
	    <div id="icon-options-general" class="icon32"><br /></div>
	    <h2>ユーザデータダウンロード</h2>
        <form>
            <table class="form-table">
                <tr valign="top">
                    <td><label for="inputtext">期間：</label></td>
                    <td>
                    	<input name="showtext_options[text]" type="text" id="from" class="regular-text" placeholder="2016/01/01" style="width:180px;" />
                    	〜
                    	<input name="showtext_options[text]" type="text" id="to" class="regular-text" placeholder="2016/12/31" style="width:180px;" />
                    </td>
                </tr>
            </table>
            <p class="submit"><input type="button" id="submit" class="button-primary" value="ダウンロード" /></p>
        </form>
	    </div>
        <script type="text/javascript">
            $(function() {

                var downloadCsvFile = function(data, fileName) {

                    var downloadData = new Blob([data.join("\r\n")], {"type": "text/csv"});

                    if (window.navigator.msSaveBlob) {
                        window.navigator.msSaveBlob(downloadData, fileName); // IE用
                    } else {
                        var downloadUrl  = (window.URL || window.webkitURL).createObjectURL(downloadData);
                        var link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = fileName;
                        link.click();
                        (window.URL || window.webkitURL).revokeObjectURL(downloadUrl);
                    }
                };

                var downloadCsv = function(response) {
                    downloadCsvFile(response.fileContent, 'UserData.csv');
                }

                $("#submit").on("click", function() {
                    $.ajax({
                        url: "<?php echo plugins_url('get-download-file.php', __FILE__); ?>",
                        data: { 
                            from: $("#from").val(),
                            to: $("#to").val()
                        },
                        success: downloadCsv,
                        error: function() {
                            alert("エラーが発生しました。");
                        }
                    });
                });
            });
        </script>
	    <?php
        // ------------------------------
    }

    function show_top_page() {
        echo 'top';
    }

    function show_add_page() {
        // ------------------------------
        ?>
        <script src="<?php echo plugins_url('js/jquery.min.js', __FILE__); ?>"></script>
        <div class="wrap">
        <div id="icon-options-general" class="icon32"><br /></div>
        <h2>ユーザデータアップロード</h2>
        <form id="submitForm">
            <table class="form-table">
                <tr valign="top">
                    <td><label for="inputtext">氏名：</label></td>
                    <td>
                        <input name="fullName" type="text" id="from" class="regular-text" placeholder="氏名" style="width:250px;" />
                    </td>
                </tr>
                <tr valign="top">
                    <td><label for="inputtext">メールアドレス：</label></td>
                    <td>
                        <input name="email" type="text" id="from" class="regular-text" placeholder="warranty@gmai.com" style="width:250px;" />
                        <!-- <input name="isSendEmail" value="yes" type="hidden"> -->
                    </td>
                </tr>
                <tr valign="top">
                    <td><label for="inputtext">メール送信：</label></td>
                    <td>
                        <input type="radio" name="isSendEmail" value="yes" checked="checked" id="isSendEmailYes">
                        <label for="isSendEmailYes">送信する</label>
                        <input type="radio" name="isSendEmail" value="no" checked="checked" id="isSendEmailNo">
                        <label for="isSendEmailNo">送信しない</label>
                    </td>
                </tr>
                <tr valign="top">
                    <td><label for="inputtext">電話番号：</label></td>
                    <td>
                        <input name="phone" type="text" id="from" class="regular-text" placeholder="080-1234-1234" style="width:180px;" />
                    </td>
                </tr>
                <tr valign="top">
                    <td><label for="inputtext">画像：</label></td>
                    <td>
                        <input name="image" type="file" id="from" class="regular-text" />
                    </td>
                </tr>
            </table>
            <p class="submit"><input type="button" id="submit" class="button-primary" value="アップロード" /></p>
        </form>
        </div>
        <script type="text/javascript">
            // submit
            $("#submit").on("click", function() {

                var fd = new FormData($("#submitForm")[0]);

                var uploadSuccess = function(response) {
                    alert('アップロード完了しました。');
                    window.location.reload();
                }

                $.ajax({
                    url: '/warranty/api/upload.php',
                    type: 'post',
                    processData: false,
                    contentType: false,
                    data: fd,
                    dataType: "json",
                    success: uploadSuccess,
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
            });        
        </script>
        <?php
        // ------------------------------
    }
}

// include_once '../wp-content/plugins/wpp-download/config.php';
plugins_url( 'config.php', __FILE__ );
$download = new Download;

