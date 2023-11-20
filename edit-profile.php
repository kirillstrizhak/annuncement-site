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

$parsedUser = htmlspecialchars(json_encode($user));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ui.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/0d90cb17ec.js" crossorigin="anonymous"></script>
    <title>Редактирование профиля - <?=$user['login'];?></title>
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
        <main class="editProfile_container-mobile container" style="display: flex; align-items: center; justify-content: center;">
            <div class="profileEdit_container" style="margin-top: 35px;" data-user-obj="<?=$parsedUser;?>">
                <h2>Редактирование профиля</h2>
                <div class="postEdit_sections">
                    <div class="postEdit_section">
                        <p>Имя профиля</p>
                        <input class="input_default js-userNameEditField"  value="<?=$user['nickname'];?>" placeholder="Введите отображаемое имя">
                    </div>
                    <div class="postEdit_section">
                        <p>Номер телефона</p>
                        <div class="fakeInput input_default js-userPhoneEditField" >
                            <span>+7</span>
                            <input class="signup_phone" type="tel" value="<?=$user['phone'];?>" oninput="formatPhoneNumber()" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name="phone" placeholder="123-456-7890">
                        </div>
                    </div>
                    <div class="postEdit_section">
                        <p>E-mail</p>
                        <input class="input_default js-userEmailEditField"  value="<?=$user['email'];?>" placeholder="Введите E-mail">
                    </div>
                    <div class="postEdit_section js-userEditDropdown_city" >
                        <p>Город</p>
                        <div class="dropdown_menu js-editUser-city" data-post-schedule="<?=$user['city'];?>" >
                            <div class="input_default dropdown_input">
                                <span>Выберите город</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
                    </div>
                    <div class="postEdit_section js-editUserBio">
                        <p>О себе</p>
                        <textarea name="bio" class="input_default js-userBioEditField" maxlength="500" style="min-height: 150px;" placeholder="Расскажите о себе"><?=$user['about'];?></textarea>
                    </div>
                </div>    
                <div class="postEdit_buttons">
                    <a href="account-page.php?id=<?=$user['id'];?>" class="button_default cancelProfileChanges">Отмена</a>
                    <div class="button_default saveProfileChanges">Сохранить</div>
                </div>
            </div>
        </main>
    </body>

    <footer></footer>

    <script src="js/ui.js"></script>
    <script src="js/main.js"></script>
    <script>
        const AccountPageEdit = new AccountEditPage();
        AccountPageEdit.initEditFields();
        formatPhoneNumber();
        const bioSymbolCounter = new SymbolCounter(document.querySelector('.js-editUserBio'), document.querySelector('.js-userBioEditField'), 500);
        bioSymbolCounter.init();
    </script>

</html>