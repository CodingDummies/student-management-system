<?php

require_once("classes/StudentList.php");

use App\Classes\StudentList;

$studentList = StudentList::fetchStudents();
header('Content-Type: application/json');
echo json_encode($studentList);
