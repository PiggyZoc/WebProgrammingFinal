<?php
/**
 * Created by PhpStorm.
 * User: 2089768600
 * Date: 2017/5/27
 * Time: 19:56
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$id=$_GET['userID'];
$psd=$_GET['psd'];
$name=$_GET['name'];

$mysqli = mysqli_connect("localhost:3306", "512test", "123456", "project");
//判断是否连接成功
if(!$mysqli ){
    echo mysqli_connect_error();
}
try {
    $result = $mysqli->query("INSERT INTO `project`.`persons` (`id`, `password`, `name`) VALUES ('$id', '$psd', '$name') ") or die("SQL语句执行失败");
    echo "Successfull!";
}catch (mysqli_sql_exception $e){
    throw $e;
    echo "Failed";
}
mysqli_close($mysqli);
?>