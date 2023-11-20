<?php

if(isset($_FILES['image'])) {
    $file_name = $_FILES['image']['name'];
    $file_tmp = $_FILES['image']['tmp_name'];

    $images_dir = '../img/uploadedPostImages/';
    $target_dir = $images_dir . basename($file_name);

    if(move_uploaded_file($file_tmp, $target_dir)) {
        echo 'Файл загружен на сервер';
    } else {
        echo 'При загрузке файла произошла ошибка';
    }
}

?>