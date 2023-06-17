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
        <div style="background: #000000; width: 100%; height: 25px;"></div>
        <div class="header_main_content">
            <div class="user">
<?php if ($_COOKIE['user'] != ''):?>
            <a href="creating-post.php" class="add_post button_default">Добавить объявление</a>
            <div class="user_info">
                <div class="user_notification">
                    <div><i class="fa-regular fa-bell"></i></div>
                </div>
                <div class="user_name" data-userid="<?=$_COOKIE['user_id'];?>"><?=$_COOKIE['user'];?></div>
                <div class="user_avatar"><img src="img/placeholder_avatar.png" alt="avatar"></div>
                <div class="user_dropdown" style="display: none;">
                    <a href="#" class="user_dropdown-option">Профиль</a>
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

    <main class="container">
        <div class="post_creating-content">
            <ul class="post_creating-panel">
                    <h2>Структура</h2>
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
                    <span class="button-underlined_text">Публикация</span>
                </li>
            </ul>
            <div class="post_creating_container">
                <h1>Новое объявление</h1>
                <div class="post_creating-sections">
                    <div class="post_creating-category">
                        <div class="post_creating-box">
                        <p>Категория</p>
                        <div class="dropdown_menu js-post-category">
                            <div class="input_default dropdown_input">
                                <span>Выберите категорию</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled">
                                <div class="dropdown_item">Поиск работы</div>
                                <div class="dropdown_item">Поиск сотрудника</div>
                                <div class="dropdown_item">Вещи, электроника и прочее</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    </main>

    <footer>
        
    </footer>
</body>
<script src="js/main.js"></script>
<script src="js/ui.js"></script>
<script>
    let categoryMenu = new DropdownMenu('js-post-category');
    categoryMenu.init();
    postCreatingPage.newPostInit()
</script>
</html>

