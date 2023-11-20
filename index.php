<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ui.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/0d90cb17ec.js" crossorigin="anonymous"></script>
    <title>Главная</title>
</head>
<body style="background: var(--almost-white);">
    <div class="preLoader_container">
        <div id="preloader" class="loader_wrapper">
            <div class="loader"></div>
        </div>
    </div>
    <header>
        <div class="header_topBar"><a href="index.php"></a></div>
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
    <main class="container">
        <nav class="categories">
            <div class="button_underlined js-allCategoriesBtn button_underlined-active">
                <span class="button-underlined_text">ВСЕ КАТЕГОРИИ</span>
            </div>
            <div class="button_underlined js-findJobBtn">
                <span class="button-underlined_text">НАЙТИ РАБОТУ</span>
            </div>
            <div class="button_underlined js-findEmployerBtn">
                <span class="button-underlined_text">НАЙТИ СОТРУДНИКА</span>
            </div>
            <div class="button_underlined js-etcBtn">
                <span class="button-underlined_text">ВЕЩИ, ЭЛЕКТРОНИКА И ПРОЧЕЕ</span>
            </div>
        </nav>
        <div class="searchPosts">
            <div class="fakeInput input_default searchPostsInput">
                <div class="searchPosts_field">
                    <span><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input placeholder="Поиск объявлений...">
                    <span class="js-removeSearchFilterButton" style="display: none;"><i class="fa-solid fa-xmark"></i></span>
                </div>
                <div class="button_default searchPosts_button">Поиск</div>
            </div>
        </div>
        <div class="alert-block">
            <p>Дамы и господа! Эра рофлов окончена. Всвязи с размещением этого проекта как работы в моём портфолио, прошу вас впредь публиковать только 
            объявления пристойного содержания. Всем спасибо!</p>
        </div>
        <nav class="categories_mob">
            <div class="categories_opener">Все категории <span><i class="fa-solid fa-caret-down"></i></span></div>
            <div class="filter_opener">Фильтры <span><i class="fa-solid fa-caret-down"></i></span></div>
        </nav>
        <div class="posts_content">
            <div class="posts_container">
                <div class="postsPreloader_container"></div>
                <div class="renderedPosts"></div>
            </div> 
            <div class="categoriesAndFilters">
                <div class="filters">
                    <div class="filters_main">
                        <div class="price">
                            <h1>Цена/Оплата, ₽</h1>
                            <div class="price_minmax">
                                <div class="price_min">
                                    <div class="price_from">от</div><input class="input_default" type="number" placeholder="Мин.">
                                </div>
                                <div class="price_max">
                                    <div class="price_to">до</div><input class="input_default" type="number" placeholder="Макс.">
                                </div>
                            </div>
                        </div>
                        <div class="posted">
                            <h1>Размещено</h1>
                            <div class="posted_filters">
                                <label class="posted_setting">
                                    <div class="checkbox_circle">
                                        <input class="js-checkbox-todayPosts" type="checkbox" name="posted_today">
                                        <div class="checkbox-circle_background"></div>
                                    </div>
                                    <p>Сегодня</p>
                                </label>
                                <label class="posted_setting">
                                    <div class="checkbox_circle">
                                        <input class="js-checkbox-weekPosts" type="checkbox" name="posted_atweek">
                                        <div class="checkbox-circle_background"></div>
                                    </div>
                                    <p>За последние 7 дней</p>
                                </label>
                                <label class="posted_setting">
                                    <div class="checkbox_circle">
                                        <input class="js-checkbox-allTimePosts" type="checkbox" name="posted_alltime">
                                        <div class="checkbox-circle_background"></div>
                                    </div>
                                    <p>За всё время</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="filters_expanded">
                        <div class="filters_dropdowns">
                            
                        </div>
                    </div>
                    <!-- <p class="expanded_search">Расширенный поиск <span><i class="fa-solid fa-caret-down"></i></span></p> -->
                </div>
                <div class="categories_mob-container">
                    <h1>Категории</h1>
                    <div class="categories_mob-buttons">
                        <div class="button_underlined button_underlined-active js-allCategoriesBtn">Все категории</div>                      
                        <div class="button_underlined js-findJobBtn">Поиск работы</div> 
                        <div class="button_underlined js-findEmployerBtn">Поиск сотрудника</div> 
                        <div class="button_underlined js-etcBtn">Вещи, электроника и пр.</div>  
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
        
    </footer>
</body>

<script async src="js/main.js"></script>
<script async src="js/ui.js"></script>
</html>

