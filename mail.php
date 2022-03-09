<?php
/* получатели */
$to= "m-ain@mail.ru ,reklama@krovlyaneft.ru";

/* тема/subject */
$subject = $_POST['more_info2'];

/* сообщение */
$message = '
<html>
<head>
 <title>'.$_POST['more_info2'].'</title>
</head>
<body>
<p>'.$_POST['more_info'].'</p>
<table>
 <tr>
<td>Имя:</td><td>'.$_POST['name'].'</td>
 </tr>
 <tr>
<td>Телефон:</td><td>'.$_POST['phone'].'</td>
 </tr>
 <tr>
<td>Когда позвонить:</td><td>'.$_POST['when'].'</td>
 </tr>
  <tr>
<td>IP:</td><td>'.$_SERVER['REMOTE_ADDR'].'</td>
 </tr>
</table>
</body>
</html>
';
/* Для отправки HTML-почты вы можете установить шапку Content-type. */
$headers= "MIME-Version: 1.0\r\n";
$headers.="Content-type: text/html; charset=UTF-8\r\n";
/* дополнительные шапки */
$headers .= "From: zayavka@kazan-metallocherepica.ru\r\n";

/* и теперь отправим из */
var_dump(mail($to, $subject, $message, $headers));


var_dump($_POST);
