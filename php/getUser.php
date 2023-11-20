<?php

$user_id = $_GET['userId'];

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT * FROM users WHERE id = '$user_id'");

$user = array();
while ($row = $result->fetch_assoc()) {
    $user = $row;
}

$mysql->close();

$jsonUser = json_encode($user);
header('Content-Type: application/json');
echo $jsonUser;

?>