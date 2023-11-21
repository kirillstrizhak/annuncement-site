<?php if ($_COOKIE['user_id'] == '') {
    header('Location: /');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ui.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/0d90cb17ec.js" crossorigin="anonymous"></script>
    <title>Создание объявления</title>
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

    <main class="creatingPost_container-mobile container">
        <div class="post_creating-content">
            <ul class="post_creating-panel">
                    <!-- <h2>Структура</h2> -->
                <li class="button_underlined panel_button js-structure-category activePanelSection">
                    <span class="button-underlined_text">Категория</span>
                </li>
                <li class="button_underlined panel_button js-structure-main">
                    <span class="button-underlined_text">Основное</span>
                </li>
                <li class="button_underlined panel_button js-structure-images">
                    <span class="button-underlined_text">Изображения</span>
                </li>
                <li class="button_underlined panel_button js-structure-preview">
                    <span class="button-underlined_text">Предпросмотр</span>
                </li>
                <li>
                    <div class="button_disabled send_button send_button-pc" style="padding: 10px 20px;">Опубликовать</div>
                </li>
            </ul>
            <div class="button_disabled send_button send_button-mob" style="padding: 10px 20px;">Опубликовать</div>
            <div class="post_creating_container">
                <h1>Новое объявление</h1>
                <div class="post_creating-imageSections">
                    <div class="imageLoad_container" style="display: none;">
                        <div class="imageLoad_images">
                            <div class="imageLoad_firstImagesRow">
                                <div class="imageLoad_button js-imageLoader1">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader0" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader2">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader1" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader3">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader2" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader4">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader3" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader5">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader4" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                            </div>    
                            <div class="imageLoad_secondImagesRow" style="display: none;">
                            <div class="imageLoad_button js-imageLoader6">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader5" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader7">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader6" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader8">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader7" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader9">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader8" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                                <div class="imageLoad_button js-imageLoader10">
                                    <div class="imageLoad_tools" style="display: none;">
                                        <div class="imageLoad_toolButton js-removeImage-btn"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <label>
                                        <div class="imageLoader_innerImage"><img src="../img/photo_placeholder2.png" alt="loadImg"></div>
                                        <input id="js-imageLoader9" type="file" accept="image/*" name="post_image">
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="imageLoad_info">
                            <p>Выберите до 10 изображений. Первое изображение будет отображаться в результатах поиска.</p>
                        </div>
                    </div>    
                </div>
                <div class="post_creating-sections">
                    <div class="post_creating-category">
                        <div class="post_creating-box">
                        <p>Категория</p>
                        <div class="dropdown_menu js-post-category">
                            <div class="input_default dropdown_input">
                                <span>Выберите категорию</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
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
<script src="js/main.js"></script>
<script src="js/ui.js"></script>
<script>
    let categoryMenu = new DropdownMenu('js-post-category', postCreatingPage.post, "category", postCreatingPage.categories);
    categoryMenu.init();
    postCreatingPage.newPostInit()
</script>
</html>

