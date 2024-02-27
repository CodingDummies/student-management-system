$(document).ready(() => {
  const deleteDialog = document.querySelector(".delete-dialog");
  const addDialog = document.querySelector(".add-dialog");
  const editDialog = document.querySelector(".edit-dialog");
  let studId;

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

  $.ajax({
    url: "app/fetch_students.php",
    method: "GET",
    dataType: "json",
    success: function (students) {
      students.forEach((student) =>
        $("table").append(createStudentRow(student))
      );
    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error(xhr.responseText);
    },
  });

  $("table").on("click", ".delete", (e) => {
    deleteDialog.showModal();
    studId = $(e.currentTarget).closest("tr").attr("id");
  });

  $("table").on("click", ".edit", (e) => {
    $.ajax({
      url: "app/fetch_student.php",
      method: "POST",
      dataType: "json",
      data: { id: $(e.currentTarget).closest("tr").attr("id") },
      success: function ({ id, name, age, program, yearLevel, gender }) {
        $("#edit-student-id").val(id);
        $("#edit-name").val(name);
        $("#edit-age").val(age);
        $("#edit-program").val(program);
        $("#edit-year-level").val(yearLevel);
        $("#edit-gender").val(gender.toLowerCase());
        editDialog.showModal();
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(xhr.responseText);
      },
    });
  });

  $(".no").click(() => deleteDialog.close());

  $(".yes").click(() => {
    $.ajax({
      url: "app/delete_student.php",
      method: "POST",
      dataType: "json",
      data: { id: studId },
      success: function (students) {
        $("table tr").slice(1).remove();
        students.forEach((student) =>
          $("table").append(createStudentRow(student))
        );
        deleteDialog.close();
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(xhr.responseText);
      },
    });
  });

  $(".add-student").click(() => {
    $.ajax({
      url: "app/get_last_id.php",
      method: "GET",
      dataType: "json",
      success: function (studentId) {
        $("#student-id").val(studentId);
        addDialog.showModal();
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(xhr.responseText);
      },
    });
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

    $.ajax({
      url: "app/add_student.php",
      method: "POST",
      dataType: "json",
      data: { id, name, age, program, yearLevel, gender },
      success: function (students) {
        $("table tr").slice(1).remove();
        students.forEach((student) =>
          $("table").append(createStudentRow(student))
        );
        addDialog.close();
        resetDialogField();
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(xhr.responseText);
      },
    });
  });

  $("#edit-student-form").submit((e) => {
    e.preventDefault();

    const id = $("#edit-student-id").val();
    const name = $("#edit-name").val().toUpperCase();
    const age = $("#edit-age").val();
    const program = $("#edit-program").val().toUpperCase();
    const yearLevel = $("#edit-year-level").val();
    const gender = $("#edit-gender").val().toUpperCase();

    $.ajax({
      url: "app/update_student.php",
      method: "POST",
      dataType: "json",
      data: { id, name, age, program, yearLevel, gender },
      success: function (students) {
        $("table tr").slice(1).remove();
        students.forEach((student) =>
          $("table").append(createStudentRow(student))
        );
        editDialog.close();
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(xhr.responseText);
      },
    });
  });
});
