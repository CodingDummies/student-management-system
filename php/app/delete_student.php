<?php

require_once("classes/StudentList.php");

use App\Classes\StudentList;

StudentList::deleteStudent($_POST["id"]);
$studentList = StudentList::fetchStudents();
header('Content-Type: application/json');
echo json_encode($studentList);
