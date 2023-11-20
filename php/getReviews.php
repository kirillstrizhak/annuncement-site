<?php

$user_id = $_GET['userId'];

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');
$result = $mysql->query("SELECT * FROM reviews WHERE user_id = $user_id");

$reviews = array();
while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

$mysql->close();

$jsonReviews = json_encode($reviews);
header('Content-Type: application/json');
echo $jsonReviews;

?>