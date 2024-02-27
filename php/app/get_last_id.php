<?php

require_once("classes/StudentList.php");

use App\Classes\StudentList;

$studentId = StudentList::getLastId();
header('Content-Type: application/json');
echo json_encode($studentId);
