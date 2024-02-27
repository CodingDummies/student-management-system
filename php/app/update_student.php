<?php

require_once("classes/StudentList.php");

use App\Classes\StudentList;

$id = $_POST["id"];
$name = $_POST["name"];
$age = $_POST["age"];
$program = $_POST["program"];
$yearLevel = $_POST["yearLevel"];
$gender = $_POST["gender"];

StudentList::updateStudent($id, $name, $age, $program, $yearLevel, $gender);
$studentList = StudentList::fetchStudents();
header('Content-Type: application/json');
echo json_encode($studentList);
