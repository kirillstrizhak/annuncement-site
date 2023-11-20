<?php

$data = json_decode(file_get_contents('php://input'));

$post_id = $data->id;
$category = $data->category;
$title = $data->title; 
$descr = $data->descr;
$experience = $data->experience;
$sphere = $data->sphere;
$schedule = $data->schedule;
$price = $data->price; 
$date = $data->date;
$image0 = $data->image0;
$image1 = $data->image1;
$image2 = $data->image2;
$image3 = $data->image3;
$image4 = $data->image4;
$image5 = $data->image5;
$image6 = $data->image6;
$image7 = $data->image7;
$image8 = $data->image8;
$image9 = $data->image9;

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("UPDATE `posts` SET 
`title` = '$title', 
`descr` = '$descr', 
`category` = '$category', 
`experience` = '$experience', 
`sphere` = '$sphere', 
`schedule` = '$schedule', 
`price` = '$price', 
`date` = '$date', 
`image0` = '$image0', 
`image1` = '$image1', 
`image2` = '$image2', 
`image3` = '$image3', 
`image4` = '$image4', 
`image5` = '$image5', 
`image6` = '$image6', 
`image7` = '$image7', 
`image8` = '$image8', 
`image9` = '$image9'
WHERE `id` = '$post_id'");

if ($result) {
    echo "Пост успешно сохранён";
 } else {
    echo "Ошибка при выполнении запроса: " . $mysql->error;
 }

$mysql->close();

?>