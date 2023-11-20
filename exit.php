<?php
setcookie('user', '', time() - 999999, "/");
setcookie('user_avatar', '', time() - 999999, "/");
setcookie('user_id', $user['id'], time() - 999999, "/");
setcookie('user_phone', '', time() - 999999, "/");
header('Location: /');
?>