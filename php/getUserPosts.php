<?php

$user_id = $_GET['userId'];

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT * FROM posts WHERE user_id = $user_id");

$posts = array();
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

$mysql->close();

$jsonPosts = json_encode($posts);
header('Content-Type: application/json');
echo $jsonPosts;

?>