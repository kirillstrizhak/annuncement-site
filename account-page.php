<?php
if(isset($_GET['id'])) {
    $userId = $_GET['id'];
}


$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT * FROM users WHERE id = $userId");

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    $error = "Произошла ошибка, пользователь с таким ID не существует";
    echo $error;
}

$mysql->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ui.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/0d90cb17ec.js" crossorigin="anonymous"></script>
    <title><?=$user['nickname'];?></title>
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

    <body>
        <main class="accountPage_container-mobile container">
            <div class="accountPage_container">
                <div class="userPageTitle">
                    <h3>Основное</h3>
<?php if($_COOKIE['user_id'] == $user['id']):?>    
                    <a class="editProfileButton underlined_button-small" href="edit-profile.php?id=<?=$user['id'];?>">
                        Редактировать профиль
                    </a>
<? endif;?>  
                </div>
                <div class="userTop">
                    <div class="userMain" data-page-userid="<?=$user['id'];?>">
<?php if($_COOKIE['user_id'] == $user['id']):?>    
                        <div class="avatarLoader_button">
                            <label>
                                <div class="avatarLoader_innerImage"><img class="avatarImage" src="img/uploadedAvatars/<?=$user['avatar'];?>" alt="avatar" class="userAvatar"></div>
                                <input id="js-avatarLoader" type="file" accept="image/*" name="avatar_image">
                            </label>
                            <div class="loaderIcon"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
                        </div>
<? else:?>
                        <img class="avatarImage" src="img/uploadedAvatars/<?=$user['avatar'];?>" alt="avatar" class="userAvatar">
<? endif;?>                             
                        <div class="ratingGrade js-gradeByAnotherUser">
                            <span class="ratingGradeNumber"><?=$user['rating'];?></span>
                            <div class="rating_stars accountPageRating js-user-<?=$user['id'];?>" data-total-value="<?=$user['rating'];?>">
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
                        <p class="userName"><?=$user['nickname'];?></p>
                    </div>
                        <div class="userAdditional" style="margin-top: 25px;">
                            <div class="userDetail">
                                <div><span>Телефон</span><p class="js-phone-number"><?=$user['phone'];?></p></div>                        
                            </div>
                            <div class="userDetail">
                                <div><span>Город</span><p><?=$user['city'];?></p></div>                              
                            </div>
                            <div class="userDetail">
                                <div><span>E-mail</span><p><?=$user['email'];?></p></div>     
                            </div>
                        </div>
                </div>
<?php if($user['about'] != ''):?>
                <div class="userBlock userBio">
                    <h3>О себе</h3>
                    <p><?=$user['about'];?></p>
                </div>
<? endif;?>                 
                <div class="userPosts">
                    <h3>Посты пользователя</h3>
                    <div class="userPosts_container"></div>
                </div>
                <div class="userReviews">
                    <h3>Отзывы</h3>
<?php if($_COOKIE['user_id'] != $user['id']):?> 
                    <div class="leaveFeedbackButton">Оставить отзыв</div>
                    <div id="reviewForm" class="userReview">
                        <div class="reviewTop">
                            <p>Новый отзыв</p>
                            <div class="closeButton js-close-reviewForm"><i class="fa-solid fa-xmark"></i></div>
                        </div>
                        <span>Заголовок</span>
                        <input class="reviewTitleInput input_default" type="text" placeholder="Ваш отзыв одним предложением">
                        <div class="reviewTextInput">
                            <span>Отзыв</span>
                            <textarea class="userAccountReviewTextarea input_default" style="width: 100%;" name="userReview" id="userAccountReview" cols="80" rows="20" maxlength="500" placeholder="Введите текст Вашего отзыва"></textarea>
                        </div> 
                        <span>Оценка</span>
                        <div class="gradeAndSend">
                            <div class="rating_stars js-user-<?=$user['id'];?>" data-total-value="0">
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
                            <div class="sendReviewButton button_default">Отправить</div>
                        </div>
                            
                    </div>
<? endif;?>    
                    <div class="userReviews_container"></div>
                </div>
            </div>
        </main>
        
        <footer>
        <div class="footer_contacts">
            <h1>Контакты</h1>
            <div class="footer_contacts-main">
                <ul>
                    <li><a href="tel:+79257377139"><span class="contact_icon"><i class="fa-solid fa-phone"></i></span>+7 925 737 71-39</a></li>
                    <span class="footer_separator_line">|</span>
                    <li><a href="mailto:holdup0192@mail.ru"><span class="contact_icon"><i class="fa-solid fa-envelope"></i></span>holdup0192@mail.ru</a></li>
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
    <script async src="js/main.js"></script>
    <script>
        if(document.querySelector('.reviewTextInput')) {
            const reviewSymbolCounter = new SymbolCounter(document.querySelector('.reviewTextInput'), document.querySelector('.userAccountReviewTextarea'), 500);
            reviewSymbolCounter.init();
        }
    </script>

</html>    
