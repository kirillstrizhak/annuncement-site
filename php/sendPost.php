<?php

$data = json_decode(file_get_contents('php://input'));

$user_id = $data->userid;
$user_name = $data->userName;
$user_nickName = $data->userNickname;
$user_phone = $data->userPhone;
$user_avatar = $data->userAvatar;
$user_rating = $data->userRating;
$category= $data->category;
$title = $data->title; 
$descr = $data->descr;
$experience = $data->experience;
$sphere = $data->sphere;
$schedule = $data->schedule;
$price = $data->price; 
$date = $data->date;
$time = $data->time;
$views = $data->views;
$draft = $data->draft; 
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

$result = $mysql->query("INSERT INTO `posts`(`user_id`, `user_name`, `user_phone`, `user_avatar`, `user_rating`, `title`, `descr`, `category`, `experience`, `sphere`, `schedule`, `price`, `date`, `time`, `views`, `image0`, `image1`, `image2`, `image3`, `image4`, `image5`, `image6`, `image7`, `image8`, `image9`) 
VALUES ('$user_id','$user_name', '$user_phone', '$user_avatar', '$user_rating', '$title','$descr','$category','$experience','$sphere','$schedule','$price','$date', '$time','$views', '$image0', '$image1', '$image2', '$image3', '$image4', '$image5', '$image6', '$image7', '$image8', '$image9')");

if ($result) {
   echo 'Всё норм, загрузили пост';
 } else {
   echo "Ошибка при выполнении запроса: " . $mysql->error;
 }

$mysql->close();

?>