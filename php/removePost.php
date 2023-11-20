<?php

$id = $_POST['id'];

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("DELETE FROM posts WHERE id = '$id'");

if ($result) {
    echo "Пост с ID " . $id . "успешно удалён";
 } else {
    echo "Ошибка при выполнении запроса: " . $mysql->error;
 }

$mysql->close();

?>