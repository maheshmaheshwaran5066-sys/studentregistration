const studentTableBody =
    document.getElementById("studentTableBody");

const emptyMessage =
    document.getElementById("emptyMessage");

const searchInput =
    document.getElementById("searchInput");


let students = [];


// =========================
// Fetch Students
// =========================

async function fetchStudents() {

    try {

        const response =
            await fetch("/api/students");

        const data =
            await response.json();


        if (response.ok) {

            students = data.students;

            displayStudents(students);

        } else {

            console.error(data.message);

        }

    } catch (error) {

        console.error(
            "Error fetching students:",
            error
        );

    }

}


// =========================
// Display Students
// =========================

function displayStudents(studentList) {

    studentTableBody.innerHTML = "";


    if (studentList.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    studentList.forEach((student) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.registerNumber || "N/A"}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.department || "N/A"}
            </td>

            <td>
                ${student.year || "N/A"}
            </td>

            <td>

                <button
                    class="action-btn view-btn"
                    onclick="viewStudent('${student._id}')"
                >
                    View
                </button>

                <button
                    class="action-btn edit-btn"
                    onclick="editStudent('${student._id}')"
                >
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent('${student._id}')"
                >
                    Delete
                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });

}


// =========================
// Search
// =========================

searchInput.addEventListener(
    "input",
    () => {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        const filteredStudents =
            students.filter((student) => {

                return (

                    student.name
                        ?.toLowerCase()
                        .includes(searchTerm)

                    ||

                    student.email
                        ?.toLowerCase()
                        .includes(searchTerm)

                    ||

                    student.registerNumber
                        ?.toLowerCase()
                        .includes(searchTerm)

                );

            });


        displayStudents(filteredStudents);

    }
);


// =========================
// View Student
// =========================

function viewStudent(id) {

    window.location.href =
        `/student.html?id=${id}`;

}


// =========================
// Edit Student
// =========================

function editStudent(id) {

    window.location.href =
        `/edit-student.html?id=${id}`;

}


// =========================
// Delete Student
// =========================

async function deleteStudent(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/students/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Student deleted successfully!"
            );

            fetchStudents();

        } else {

            alert(
                data.message ||
                "Unable to delete student."
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server."
        );

    }

}


// =========================
// Load Students
// =========================

fetchStudents();