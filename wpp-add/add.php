<?php
/*
Plugin Name: Download User Info
Plugin URI: http://www.example.com/plugin
Description: ユーザデータダウンロード用のプラグイン
Author: tony
Version: 0.1
Author URI: http://www.example.com
*/
class Add {
	function __construct() {
		add_action('admin_menu', array($this, 'add_pages'));
	}
	function add_pages() {
      add_menu_page('ユーザ情報追加','ユーザ情報追加',  'level_8', __FILE__, array($this,'show_text_option_page'), '');
    }
    function show_text_option_page() {
    	?>
    		
    	<?php
    }
}
$add = new Add;