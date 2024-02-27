<?php

require_once("classes/StudentList.php");

use App\Classes\StudentList;

$student = StudentList::fetchStudent($_POST["id"]);
header('Content-Type: application/json');
echo json_encode($student);
