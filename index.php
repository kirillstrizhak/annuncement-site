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
                <div class="user_avatar"><img src="uploads/user_avatars/<?=$_COOKIE['avatar']?>" alt="avatar"></div>
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
        <nav class="categories">
            <div class="button_underlined">
                <span class="button-underlined_text">ВСЕ КАТЕГОРИИ</span>
            </div>
            <div class="button_underlined">
                <span class="button-underlined_text">НАЙТИ РАБОТУ</span>
            </div>
            <div class="button_underlined">
                <span class="button-underlined_text">НАЙТИ СОТРУДНИКА</span>
            </div>
            <div class="button_underlined">
                <span class="button-underlined_text">ВЕЩИ, ЭЛЕКТРОНИКА И ПРОЧЕЕ</span>
            </div>
        </nav>
        <nav class="categories_mob">
            <div class="categories_mob-dropdown_opener">Все категории <span><i class="fa-solid fa-caret-down"></i></span></div>
            <div class="filter_opener">Фильтры <span><i class="fa-solid fa-caret-down"></i></span></div>
        </nav>
        <div class="posts_content">
            <div class="posts_container">
                <div class="no_posts">
                    <div>
                        <span>Здесь ещё нет публикаций</span>
                    </div>
                </div>

                <!-- <div class="post">
                    <div class="post_info">
                        <div class="post_main">
                            <div class="slider-announcement"></div>
                            <div class="post_text">
                                <div class="post_additional_mob">
                                    <div class="post_additional_mob-category">
                                        Поиск работы
                                    </div>
                                    <div class="post_additional_mob-date">
                                        Сегодня 17:25
                                    </div>
                                </div>
                                <a href="#">
                                    <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro culpa quis cum!</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aliquam quisquam, laboriosam sunt nulla, quo dolores eligendi rerum tempore quaerat ab autem laudantium atque eos quia, labore vero et asperiores similique! Enim necessitatibus explicabo cum recusandae nostrum cumque obcaecati! Deleniti odio blanditiis dicta consequatur deserunt voluptas quaerat praesentium animi at officiis doloremque dolore, amet architecto, quam maxime obcaecati mollitia quidem. Provident sapiente neque quos, exercitationem odio rem mollitia deserunt numquam voluptatibus quia doloribus alias hic fugiat, esse cupiditate voluptate soluta.</p>
                                </a>
                            </div>
                        </div>
                        <div class="post_additional"> 
                            <div class="post_additional-user">
                                <a href="#">
                                    <img src="img/placeholder_avatar.png" alt="avatarka">
                                    <p class="post_username">Semen Strikov</p>
                                    <div class="isOnline">
                                        <span></span><p>Offline</p>
                                    </div>
                                    <p class="post_user-registered"><span>Зарегистрирован:</span> 2 дня</p>
                                </a>
                            </div>
                        <div class="post_additional-details">
                            <ul>
                                <li><span>Категория:</span> Поиск работы</li>
                                <li><span>Сфера:</span> Прочее</li>
                                <li><span>Опыт работы:</span> Без опыта</li>
                                <li><span>График:</span> Не принципиально</li>
                            </ul>
                        </div>
                        <div class="post_additional-date">
                            <p><span>Размещено:</span> Сегодня 17:22</p> 
                            <p><span>Просмотров:</span> 2</p> 
                        </div>
                    
                    </div>
                    </div>
                    <div class="post_contact">
                        <div class="post_price">
                            <p>Сумма не указана</p><span class="valuta"></span>
                        </div>
                        <div class="post_buttons">
                            <div class="button_default">Чат</div>
                           <div class="button_default">Позвоните мне</div>
                        </div>
                    </div>
                </div>-->
            </div> 
            <div class="filters">
                <div class="filters_main">
                    <div class="price">
                        <h1>Цена/Оплата, ₽</h1>
                        <div class="price_minmax">
                            <div class="price_min">
                                <div class="price_from">от</div><input class="input_default" type="text" placeholder="Мин.">
                            </div>
                            <div class="price_max">
                                <div class="price_to">до</div><input class="input_default" type="text" placeholder="Макс.">
                            </div>
                        </div>
                    </div>
                    <div class="posted">
                        <h1>Размещено</h1>
                        <div class="posted_filters">
                            <div class="posted_setting">
                                <div class="checkbox_circle">
                                    <input type="checkbox" name="posted_today">
                                    <div class="checkbox-circle_background"></div>
                                </div>
                                <p>Сегодня<p>
                            </div>
                            <div class="posted_setting">
                                <div class="checkbox_circle">
                                    <input type="checkbox" name="posted_atweek">
                                    <div class="checkbox-circle_background"></div>
                                </div>
                                <p>За последние 7 дней</p>
                            </div>
                            <div class="posted_setting">
                                <div class="checkbox_circle">
                                    <input type="checkbox" name="posted_alltime">
                                    <div class="checkbox-circle_background"></div>
                                </div>
                                <p>За всё время</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filters_expanded">
                    <div class="filters_dropdowns">
                        
                    </div>
                </div>
                <p class="expanded_search">Расширенный поиск <span><i class="fa-solid fa-caret-down"></i></span></p>
            </div>
        </div>
    </main>
    <footer>
        
    </footer>
</body>

<script src="js/main.js"></script>
<script src="js/ui.js"></script>
</html>

