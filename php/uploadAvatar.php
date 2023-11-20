<?php

$userId = $_POST['id'];

if(isset($_FILES['image'])) {
    $file_name = $_FILES['image']['name'];
    $file_tmp = $_FILES['image']['tmp_name'];

    $images_dir = '../img/uploadedAvatars/';
    $target_dir = $images_dir . basename($file_name);

    if(move_uploaded_file($file_tmp, $target_dir)) {
        echo 'Файл загружен на сервер';
    } else {
        echo 'При загрузке файла произошла ошибка';
    }
    
    $mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

    $mysql->query("UPDATE `users` SET `avatar` = '$file_name' WHERE id = '$userId'");
    $mysql->query("UPDATE `posts` SET `user_avatar` = '$file_name' WHERE user_id = '$userId'");
    $mysql->query("UPDATE `reviews` SET `author_avatar` = '$file_name' WHERE author_id = '$userId'");

    $mysql->close();

    setcookie('user_avatar', '', time() - 3600, "/");
    setcookie('user_avatar', $file_name, time() + 518400 * 24, "/");
}

?>