<?php
     $id = isset($_GET['id']) ? trim($_GET['id']) : '';
     $password=isset($_GET['psw']) ? trim($_GET['psw']) : '';
     if(empty ($id)||empty($password)){
           echo "0";
           exit;
     }
    $mysqli1 = mysqli_connect("localhost:3306", "512test", "123456", "project");
   //判断是否连接成功
   if(!$mysqli1 ){
       echo mysqli_connect_error();
   }
   
      
 try {
    $result = $mysqli1->query("SELECT id,password,name FROM persons where id='$id'") or die("SQL语句执行失败");
       
}catch (mysqli_sql_exception $e){
    throw $e;
    
}
while($row = $result->fetch_array(MYSQLI_ASSOC)){
	session_start();
    if($row['id']==$id &&$row['password']==$password){
		$_SESSION['id'] = $row['id'];
        $_SESSION['password'] = $row['password'];
        sleep(1);
       
        echo "1";
        exit;
    }
     
};
 echo "2";
mysqli_close($mysqli1);

?>