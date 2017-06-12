<?php
    $name = isset($_GET['name']) ? trim($_GET['name']) : '';
    if($name=='') {echo "0"; exit;}
    else{
     session_start();
     $_SESSION['name'] = $name;
     echo "1";
    }
?>