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

$parsedPost = htmlspecialchars(json_encode($post));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ui.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/0d90cb17ec.js" crossorigin="anonymous"></script>
    <title>Редактирование объявления - <?=$post['title'];?></title>
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
        <main class="editPost_container-mobile container" style="display: flex; align-items: center; justify-content: center;">
            <div class="editPost_container" data-date="<?=$post['date'];?>">
                <h2>Редактирование объявления</h2>
                <div class="postEdit_sections js-JSONPost" data-post="<?=$parsedPost;?>">
                    <div class="postEdit_section js-postEditDropdown_category">
                        <p>Категория</p>
                        <div class="dropdown_menu js-editPost-category" data-post-category="<?=$post['category'];?>">
                            <div class="input_default dropdown_input">
                                <span>Выберите категорию</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
                    </div>
                    <div class="postEdit_section js-postEditDropdown_sphere">
                        <p>Сфера</p>
                        <div class="dropdown_menu js-editPost-sphere" data-post-sphere="<?=$post['sphere'];?>">
                            <div class="input_default dropdown_input">
                                <span>Выберите сферу</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
                    </div>
                    <div class="postEdit_section js-postEditDropdown_experience">
                        <p>Опыт работы</p>
                        <div class="dropdown_menu js-editPost-experience" data-post-experience="<?=$post['experience'];?>">
                            <div class="input_default dropdown_input">
                                <span>Выберите опыт</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
                    </div>
                    <div class="postEdit_section js-postEditDropdown_schedule">
                        <p>График</p>
                        <div class="dropdown_menu js-editPost-schedule" data-post-schedule="<?=$post['schedule'];?>">
                            <div class="input_default dropdown_input">
                                <span>Выберите график</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
                    </div>
                    <div class="postEdit_section">
                        <p>Заголовок</p>
                        <input type="text" class="editPost_title input_default" value="<?=$post['title'];?>">
                    </div>
                    <div class="postEdit_section js-editUserBio">
                        <p>Описание</p>
                        <textarea name="editDescr" class="postEdit_textarea input_default editPost_descr" style="min-height: 150px;"><?=$post['descr'];?></textarea>
                    </div>
                    <div class="postEdit_section">
                        <p>Цена</p>
                        <div class="editPost_priceField">
                            <input type="number" class="input_default editPost_price" value="<?=$post['price'];?>">
                            <span>₽</span>
                        </div>
                    </div>
                    <div class="postEdit_images postEdit_section">
                        <p>Фотографии</p>
                        <div class="imageLoad_images">
                            <div class="imageLoad_firstImagesRow">
                                <div class="imageLoad_button js-imageLoader1">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image0'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader0" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader2">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image1'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader1" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader3">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image2'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader2" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader4">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image3'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader3" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader5">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image4'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader4" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                            </div>          
                            <div class="imageLoad_secondImagesRow">  
                                <div class="imageLoad_button js-imageLoader6">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image5'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader5" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader7">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image6'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader6" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader8">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image7'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader7" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader9">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image8'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader8" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader10">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="<?=$post['image9'];?>" alt="loadImg"></div>
                                        <input id="js-imageLoader9" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="postEdit_buttons">
                        <a href="post-page.php?id=<?=$post['id'];?>" class="button_default cancelPostChanges">Отмена</a>
                        <div class="button_default savePostChanges">Сохранить</div>
                    </div>
                </div>
            </div>
        </main>
    </body>

    <footer></footer>

    <script src="js/ui.js"></script>
    <script src="js/main.js"></script>
    <script>
        const postEditDescrSymbolCounter = new SymbolCounter(document.querySelector('.js-editUserBio'), document.querySelector('.editPost_descr'), 1000);
        postEditDescrSymbolCounter.init();
    </script>

</html>