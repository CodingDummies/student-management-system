<?php

declare(strict_types=1);

namespace App\Classes;

class StudentList {
    private static function init() {
        $mysqli = mysqli_connect("localhost", "root", "", "db_students");

        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        return $mysqli;
    }

    public static function fetchStudent(string $id): array {
        $mysqli = self::init();

        $stmt = $mysqli->prepare("SELECT * FROM tbl_students WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($id, $name, $age, $program, $yearLevel, $gender);
        $stmt->fetch();
        $stmt->close();
        $mysqli->close();
        return [
            'id' => $id,
            'name' => $name,
            'age' => $age,
            'program' => $program,
            'yearLevel' => $yearLevel,
            'gender' => $gender
        ];
    }

    public static function fetchStudents(): array {
        $mysqli = self::init();

        $studentsQuery = "SELECT * FROM tbl_students";

        $stmt = $mysqli->prepare($studentsQuery);
        $stmt->execute();
        $stmt->bind_result($id, $name, $age, $program, $yearLevel, $gender);

        $studentList = array();

        $studentList = [];
        while ($stmt->fetch()) {
            $studentList[] = array(
                'id' => $id,
                'name' => $name,
                'age' => $age,
                'program' => $program,
                'yearLevel' => $yearLevel,
                'gender' => $gender
            );
        }

        $stmt->close();
        $mysqli->close();

        return $studentList;
    }

    public static function addStudent(string $name, string $age, string $program, int $yearLevel, string $gender): void {
        $mysqli = self::init();

        $stmt = $mysqli->prepare("INSERT INTO tbl_students (name, age, program, year_level, gender) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sisis", $name, $age, $program, $yearLevel, $gender);
        $stmt->execute();

        $stmt = $mysqli->prepare("INSERT INTO tbl_ids VALUES ()");
        $stmt->execute();

        $stmt->close();
        $mysqli->close();
    }

    public static function updateStudent(string $id, string $name, string $age, string $program, string $yearLevel, string $gender): void {
        $mysqli = self::init();

        $stmt = $mysqli->prepare("UPDATE tbl_students SET name=?, age=?, program=?, year_level=?, gender=? WHERE id=?");
        $stmt->bind_param("sisisi", $name, $age, $program, $yearLevel, $gender, $id);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
    }


    public static function getLastId(): int {
        $mysqli = self::init();
        $result = $mysqli->query("SELECT MAX(id) FROM tbl_ids");
        $row = $result->fetch_row();
        $studentId = (int) $row[0];
        $mysqli->close();
        return $studentId + 1;
    }

    public static function deleteStudent(string $id): void {
        $mysqli = self::init();

        $stmt = $mysqli->prepare("DELETE FROM tbl_students WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
    }
}
