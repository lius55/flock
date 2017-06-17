<?php
header('Content-type: text/html; charset=utf-8');
header('Content-Type: application/json');

include_once './config.php';
include_once './email.php';

$response = new stdClass();

// ---------------------
//       処理開始
// ---------------------
$request = json_decode(file_get_contents('php://input'), true);

// パラメーター取得
$fullName = $_POST["fullName"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$isSendEmail = isset($_POST["isSendEmail"]) ? $_POST["isSendEmail"] : 'no';

// 入力データ保存
$stmt = $dbh->prepare("insert into warranty(full_name,email,phone) values(:full_name,:email,:phone)");
$stmt->bindParam(":full_name", $fullName);
$stmt->bindParam(":email", $email);
$stmt->bindParam(":phone", $phone);
$stmt->execute();
$id = $dbh->lastInsertId();

// 画像保存
if (isset($_FILES['image'])) {
	$imageFile = $_FILES['image']['tmp_name'];
	$ext = end(explode('.', $_FILES['image']['name']));
	$imageFileName = $id . '.' . $ext;
	move_uploaded_file($imageFile, '../file/' . $imageFileName);
}

// メール送信
if ($isSendEmail == 'yes') {
	sendEmail("テスト配信", "これはテスト配信です", $email);
}

// 結果返却
$response->responseCode = RESPONSE_SUCCESS;
$response->fileName = $imageFileName;
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>