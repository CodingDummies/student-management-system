import studentsData from "./students.js";

let students = studentsData;
let studentId = 2101274;

$(document).ready(() => {
  const createStudentRow = ({ id, name, age, program, yearLevel, gender }) => {
    return `<tr id="${id}">
          <td>${id}</td>
          <td>${name}</td>
          <td>${age}</td>
          <td>${program}</td>
          <td>${yearLevel}</td>
          <td>${gender}</td>
          <td>
            <button class="edit">EDIT</button>
            <button class="delete">DELETE</button>
          </td>
        </tr>`;
  };

  const resetDialogField = () => {
    $("#name").val("");
    $("#age").val("");
    $("#program").val("");
    $("#year-level").val("");
    $("#gender").val("");
    $("#edit-name").val("");
    $("#edit-age").val("");
    $("#edit-program").val("");
    $("#edit-year-level").val("");
    $("#edit-gender").val("");
  };

  students.forEach((student) => $("table").append(createStudentRow(student)));

  const deleteDialog = document.querySelector(".delete-dialog");
  const addDialog = document.querySelector(".add-dialog");
  const editDialog = document.querySelector(".edit-dialog");

  let studId = null;

  $("table").on("click", ".delete", (e) => {
    deleteDialog.showModal();
    studId = $(e.currentTarget).closest("tr").attr("id");
  });

  $("table").on("click", ".edit", (e) => {
    const { id, name, age, program, yearLevel, gender } = students.find(
      (student) => student.id == $(e.currentTarget).closest("tr").attr("id")
    );

    $("#edit-student-id").val(id);
    $("#edit-name").val(name);
    $("#edit-age").val(age);
    $("#edit-program").val(program);
    $("#edit-year-level").val(yearLevel);
    $("#edit-gender").val(gender.toLowerCase());
    editDialog.showModal();
  });

  $(".no").click(() => deleteDialog.close());

  $(".yes").click(() => {
    students = students.filter(({ id }) => id != studId);
    $("table tr").slice(1).remove();
    students.forEach((student) => $("table").append(createStudentRow(student)));
    deleteDialog.close();
  });

  $(".add-student").click(() => {
    $("#submit").text("ADD");
    $("#title").text("ADD STUDENT");
    $("#student-id").val(studentId);
    addDialog.showModal();
  });

  $(".cancel-add").click(() => {
    addDialog.close();
    resetDialogField();
  });

  $(".cancel-edit").click(() => editDialog.close());

  $("#add-student-form").submit((e) => {
    e.preventDefault();

    const id = $("#student-id").val();
    const name = $("#name").val().toUpperCase();
    const age = $("#age").val();
    const program = $("#program").val().toUpperCase();
    const yearLevel = $("#year-level").val();
    const gender = $("#gender").val().toUpperCase();

    students.push({ id, name, age, program, yearLevel, gender });
    $("table tr").slice(1).remove();
    students.forEach((student) => $("table").append(createStudentRow(student)));
    addDialog.close();
    resetDialogField();
    studentId++;
  });

  $("#edit-student-form").submit((e) => {
    e.preventDefault();

    const id = $("#edit-student-id").val();
    const name = $("#edit-name").val().toUpperCase();
    const age = $("#edit-age").val();
    const program = $("#edit-program").val().toUpperCase();
    const yearLevel = $("#edit-year-level").val();
    const gender = $("#edit-gender").val().toUpperCase();

    const index = students.findIndex((student) => student.id == id);
    students[index] = { id, name, age, program, yearLevel, gender };
    $("table tr").slice(1).remove();
    students.forEach((student) => $("table").append(createStudentRow(student)));
    editDialog.close();
  });
});
