<?php
require_once 'PHPMailer/PHPMailerAutoload.php';

/**
 * $subject メールタイトル
 * $body 送信内容
 * $to 送信先EMAILアドレス
 */
function sendEmail($subject, $body, $to) {
    $from = EMAIL_FROM;
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->CharSet = 'utf-8';
    $mail->Host = 'sv2019.xserver.jp';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = 'warranty@xn--pckxbp2d0en.com';
    $mail->Password = '8Pawu97NTjqJ';
    $mail->setFrom(EMAIL_FROM);
    $mail->addReplyTo(EMAIL_FROM);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $body;
    return $mail->send();
}
?>