<?php 

$server = "remotemysql.com";
$user = "FitKEF77hR";
$pass = "ybVsVDXGtZ";
$database = "FitKEF77hR";

$conn = mysqli_connect($server, $user, $pass, $database);

if (!$conn) {
    die("<script>alert('Connection Failed.')</script>");
}

?>