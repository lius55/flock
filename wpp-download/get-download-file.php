<?php
header('Content-type: text/html; charset=utf-8');
header('Content-Type: application/json');

include_once './config.php';

$response = new stdClass();

// ---------------------
//       処理開始
// ---------------------
$request = json_decode(file_get_contents('php://input'), true);

// パラメーター取得
$from = (isset($_REQUEST["from"]) && strlen($_REQUEST["from"]) > 0) ? $_REQUEST["from"] : "1990/01/01";
$to = (isset($_REQUEST["to"]) && strlen($_REQUEST["to"]) > 0) ? $_REQUEST["to"]: "9999/12/31";

// 入力データ保存
$stmt = $dbh->prepare("select id,full_name, email, phone, insert_date from warranty where insert_date>:from and insert_date<:to");
$stmt->bindValue(":from", $from, PDO::PARAM_STR);
$stmt->bindParam(":to", $to, PDO::PARAM_STR);
$stmt->execute();

$response->fileContent[] = "ID,氏名,メールアドレス,電話番号,登録日時";
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$line = $row["id"].",".$row["full_name"].",".$row["email"].",".$row["phone"].",".$row["insert_date"];
	$response->fileContent[] = $line;
}

// 結果返却
$response->responseCode = RESPONSE_SUCCESS;
$response->range = $from . '-' . $to;
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>