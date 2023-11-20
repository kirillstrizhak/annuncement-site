<?php
$post_id = $_GET['postId'];

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');
$result = $mysql->query("SELECT image0, image1, image2, image3, image4, image5, image6, image7, image8, image9 FROM posts WHERE id = $post_id");

$sliderImgs = [];
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $images = [];
        for($i = 0; $i <= 10; $i++) {
            $image = $row["image$i"];
            if(!empty($image)) {
                $images[] = [
                    "src" => $image,
                    "alt" => "image $i"
                ];
            }
        }
    }
}

$mysql->close();

$jsonImages = json_encode($images);
header('Content-Type: application/json');
echo $jsonImages;

?>