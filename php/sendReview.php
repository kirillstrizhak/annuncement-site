<?php 

$data = json_decode(file_get_contents('php://input'));

$author_id = $data->authorId;
$user_id = $data->userId;
$author_name = $data->authorName;
$author_avatar = $data->authorAvatar;
$grade = $data->grade;
$date = $data->date;
$title = $data->title;
$text = $data->text;

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');
$mysql->query("INSERT INTO `reviews`(`author_id`, `user_id`, `author_name`, `author_avatar`, `grade`, `date`, `review_title`, `review_text`) VALUES ('$author_id', '$user_id', '$author_name', '$author_avatar', '$grade', '$date', '$title', '$text')");

$result = $mysql->query("SELECT * FROM reviews WHERE user_id = '$user_id'");

$user_reviews_array = array();
while($row = $result->fetch_assoc()) {
    $user_reviews_array[] = $row['grade'];
}

$sum = 0;
$count = count($user_reviews_array);

if ($count > 0) {
    foreach($user_reviews_array as $value) {
        $sum += intval($value);
    }
    
    $user_average_grade =  $sum / $count;
} else {
    echo json_encode($author_id);
}


$mysql->query("UPDATE `users` SET `rating` = '$user_average_grade' WHERE id = '$user_id'");
$mysql->query("UPDATE `posts` SET `user_rating` = '$user_average_grade' WHERE user_id = '$user_id'");

$mysql->close();

?>