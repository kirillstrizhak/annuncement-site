<?php

if(isset($_GET['id'])) {
    $postId = $_GET['id'];
}


$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT * FROM posts WHERE id = $postId");

if ($result->num_rows > 0) {
    $post = $result->fetch_assoc();
} else {
    $error = "Произошла ошибка, пост с таким ID не существует";
    echo $error;
}

$mysql->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="css/ui.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/0d90cb17ec.js" crossorigin="anonymous"></script>
    <title>Объявление - <?=$post['title'];?></title>
</head>
<body>
    <div id="preloader" class="loader_wrapper">
        <div class="loader"></div>
    </div>
    <header>
        <div class="header_topBar"><a href="index.php">
            <span><i class="fa-solid fa-arrow-left"></i></span>На главную</a>
        </div>
        <div class="header_main_content">
            <div class="logo"><a href="index.php" style="color: #fff;">STUFF SPOT</a></div>
            <div class="user">
<?php if ($_COOKIE['user_id'] != ''):?>
            <a href="creating-post.php" class="add_post button_default add_post-desktop">Добавить объявление</a>
            <a href="creating-post.php" class="add_post button_default add_post-mobile"><i class="fa-solid fa-plus"></i></a>
            <div class="user_info">
                <div class="user_notification">
                    <div><i class="fa-regular fa-bell"></i></div>
                </div>
                <div class="user_name" data-userid="<?=$_COOKIE['user_id'];?>"></div>
                <div class="user_avatar"><img src="" alt="avatar"></div>
                <div class="user_dropdown" style="display: none;">
                    <a href="account-page.php?id=<?=$_COOKIE['user_id'];?>" class="user_dropdown-option">Профиль</a>
                    <a href="/exit.php" class="user_dropdown-option">Выйти</a>
                </div>
            </div>                
<?php else:?>
            <span id="signin" class="account_button">Вход</span>
            <span id="signup" class="account_button">Регистрация</span>
<?php endif;?>
            </div>            
        </div>
        <div class="header_opener"><i class="fa-solid fa-caret-up"></i></div>
    </header>
    <main class="postPage_container-mobile container">
        <div class="postPage_container" data-id="<?=$postId;?>">
                <div class="post_info">
                        <div class="post_main">
                            <div class="post_text">
                                <div class="post_additional_mob">
                                    <div class="post_additional_mob-category">
                                        <?=$post['category']?>
                                    </div>
                                    <div class="post_additional_mob-date">
                                    <?=$post['date']?>
                                    </div>
                                </div>
                                <h1 class="post_header"><?=$post['title']?></h1>
                                <div class="slider-announcement-page"></div>
                                <h2 class="post_header">Описание</h2>
                                <pre><?=$post['descr']?></pre>
                            </div>
                        </div>
                        <div class="post_additional-details-mob">
                            <div class="post_additional-details">
                                <h2 class="post_header">Дополнительно</h2>
                                <ul>
                                    <li class="js-post-additional-category" data-post-category="<?=$post['category']?>"><span>Категория:</span> <?=$post['category']?></li>
                                    <li class="js-post-additional-sphere" data-post-sphere="<?=$post['sphere']?>"><span>Сфера:</span> <?=$post['sphere']?></li>
                                    <li class="js-post-additional-experience" data-post-exp="<?=$post['experience']?>"><span>Опыт работы:</span> <?=$post['experience']?></li>
                                    <li class="js-post-additional-schedule" data-post-schedule="<?=$post['schedule']?>"><span>График:</span> <?=$post['schedule']?></li>
                                </ul>
                                <div class="post_additional-user">
                                    <a href="account-page.php?id=<?=$post['user_id'];?>">
                                        <img src="img/uploadedAvatars/<?=$post['user_avatar'];?>" alt="avatarka">
                                        <p class="post_username"><?=$post['user_name'];?></p>
                                        <div class="ratingGrade js-gradeByAnotherUser">
                                            <span class="ratingGradeNumber" style="color: var(--feature-color);"><?=$post['user_rating']?></span>
                                            <div class="rating_stars rating_stars-mob accountPageRating js-user-<?=$post['user_id']?>" data-total-value="<?=$post['user_rating']?>">
                                                <div class="rating_star" data-item-value="5">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="4">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="3">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="2">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="1">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="post_additional-price-mob">
                            <div class="post_additional-price">
                                <?=$post['price'];?><span class="valuta">₽</span>
                            </div>
                        </div>
                        <div class="post_additional-buttons-mob">
                                    <div class="post_additional-contactBtns">
                                        <div class="button_disabled" style="width: 100%; margin: 20px 0;">Открыть чат</div>
                                        <a href="tel:+7<?=$post['user_phone']?>" class="button_default">Позвонить</a>
                                    </div>
<?php if ($_COOKIE['user_id'] === $post['user_id']):?>
                                <div class="post_additional-interactBtns">
                                    <a href="edit-post.php?id=<?=$post['id']?>" class="button_default-reversed">
                                        <span class="symbol-left"><i class="fa-solid fa-pencil"></i></span> Редактировать
                                    </a>
                                    <a class="removePost button_default-reversed button-red">
                                        <span class="symbol-left"><i class="fa-solid fa-trash"></i></span> Удалить
                                    </a>
                                </div>
<?php endif;?>
                        </div>
                        <div class="post_additional"> 
                            <div class="post_additional-info">
                                <div class="post_additional-user">
                                    <a href="account-page.php?id=<?=$post['user_id'];?>">
                                        <img src="img/uploadedAvatars/<?=$post['user_avatar'];?>" alt="avatarka">
                                        <p class="post_username"><?=$post['user_name'];?></p>
                                        <div class="ratingGrade js-gradeByAnotherUser">
                                            <span class="ratingGradeNumber" style="color: var(--feature-color);"><?=$post['user_rating']?></span>
                                            <div class="rating_stars rating_stars-mob accountPageRating js-user-<?=$post['user_id']?>" data-total-value="<?=$post['user_rating']?>">
                                                <div class="rating_star" data-item-value="5">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="4">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="3">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="2">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                                <div class="rating_star" data-item-value="1">
                                                    <i class="fa-solid fa-star"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="post_additional-details">
                                    <ul>
                                        <li class="js-post-additional-category" data-post-category="<?=$post['category']?>"><span>Категория:</span> <?=$post['category']?></li>
                                        <li class="js-post-additional-sphere js-sphereLine" data-post-sphere="<?=$post['sphere']?>"><span>Сфера:</span> <?=$post['sphere']?></li>
                                        <li class="js-post-additional-experience js-expLine" data-post-exp="<?=$post['experience']?>"><span>Опыт работы:</span> <?=$post['experience']?></li>
                                        <li class="js-post-additional-schedule js-scheduleLine" data-post-schedule="<?=$post['schedule']?>"><span>График:</span> <?=$post['schedule']?></li>
                                    </ul>
                                </div>
                                <div class="post_additional-date">
                                    <p><span>Размещено:</span> <?=$post['date']?></p>
                                </div>
                            </div>
                            <div class="post_additional-contacts">
                                <div class="post_additional-price">
                                    <?=$post['price'];?><span class="valuta">₽</span>
                                </div>
                                <div class="post_additional-buttons">
                                    <div class="post_additional-contactBtns">
                                        <div class="button_disabled" style="width: 100%; margin: 20px 0;">Открыть чат</div>
                                        <a href="tel:+7<?=$post['user_phone']?>" class="button_default">Позвонить</a>
                                    </div>
<?php if ($_COOKIE['user_id'] === $post['user_id']):?>
                                <a href="edit-post.php?id=<?=$post['id']?>" class="button_default-reversed">
                                    <span class="symbol-left"><i class="fa-solid fa-pencil"></i></span> Редактировать
                                </a>
                                <a class="removePost button_default-reversed button-red">
                                    <span class="symbol-left"><i class="fa-solid fa-trash"></i></span> Удалить
                                </a>
<?php endif;?>
                            </div>
                        </div>
                    </div>
                </div>
         </div>
    </main>
    
    <footer>
        <div class="footer_contacts">
            <h1>Контакты</h1>
            <div class="footer_contacts-main">
                <ul>
                    <li><a href="tel:+79257377139"><span><i class="fa-solid fa-phone"></i></span>+7 925 737 71-39</a></li>
                    |
                    <li><a href="mailto:holdup0192@mail.ru"><span><i class="fa-solid fa-envelope"></i></span>holdup0192@mail.ru</a></li>
                </ul>
            </div>
            <div class="footer_contacts-additional">
                <ul>
                    <li><a href="https://vk.com/suckmyplague" target="_blank"><i class="fa-brands fa-vk"></i></a></li>
                    <li><a href="https://t.me/suckmyplague" target="_blank"><i class="fa-brands fa-telegram"></i></a></li>
                </ul>
            </div>
        </div>
    </footer>

</body>

<script src="js/ui.js"></script>
<script src="js/main.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        let postPageContainer = document.querySelector('.postPage_container');
        if(postPageContainer) {
            let postId = postPageContainer.dataset.id;

            let sliderPage = document.querySelector('.slider-announcement-page');
            const announcementSlider = new Slider(sliderPage, '--slider-announcement-page-width', '--slider-announcement-page-height', '--container-width', undefined, postId);
            if(document.querySelector('.slider-announcement-page')) {
                announcementSlider.init();
            }

            let sphereLine = document.querySelector(".js-sphereLine");
            let experienceLine = document.querySelector(".js-expLine");
            let scheduleLine = document.querySelector(".js-scheduleLine");

            let sphereLineMob = document.querySelector(".js-post-additional-sphere");
            let experienceLineMob = document.querySelector(".js-post-additional-experience");
            let scheduleLineMob = document.querySelector(".js-post-additional-schedule");

            if(sphereLine.getAttribute('data-post-sphere') === '') {
                sphereLine.remove();
                sphereLineMob.remove();
            }
            if(experienceLine.getAttribute('data-post-exp') === '') {
                experienceLine.remove();
                experienceLineMob.remove();
            }
            if(scheduleLine.getAttribute('data-post-schedule') === '') {
                scheduleLine.remove();
                scheduleLineMob.remove();
            }
        }
    })

    let postId = document.querySelector('.postPage_container').dataset.id;
    let removePost = function () {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `php/removePost.php`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        }
        xhr.send(`id=${postId}`);
    }

        let ratingValue = document.querySelector('.accountPageRating').dataset.totalValue;
        let ratingNumbers = document.querySelectorAll('.ratingGrade span');

        if(ratingValue != 0) {
            ratingNumbers.forEach(number => {
                number.style.color = 'var(--feature-color)';
            })
        } else {
            ratingNumbers.forEach(number => {
                number.style.color = 'var(--light-grey)';
            })
        }
</script>

</html>
