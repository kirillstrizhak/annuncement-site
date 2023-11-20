<?php

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT MAX(id) AS max_number FROM posts");

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $maxNumber = $row['max_number'];
    echo $maxNumber;
} else {
    echo "Таблица пуста";
}

$mysql->close();

?>