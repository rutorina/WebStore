<?php
$pdo = new PDO('sqlite:database/database.sqlite');
$pdo->exec("UPDATE products SET images = NULL");
echo "Images cleared";
?>
