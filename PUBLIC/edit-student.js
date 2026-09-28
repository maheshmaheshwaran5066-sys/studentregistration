// =========================
// Get Student ID from URL
// =========================

const urlParams =
    new URLSearchParams(window.location.search);

const studentId =
    urlParams.get("id");


// =========================
// HTML Elements
// =========================

const form =
    document.getElementById("editStudentForm");

const loading =
    document.getElementById("loading");

const message =
    document.getElementById("message");

const errorMessage =
    document.getElementById("errorMessage");


// =========================
// Load Student Data
// =========================

async function loadStudent() {

    if (!studentId) {

        showError("Student ID is missing.");

        return;

    }


    try {

        const response =
            await fetch(
                `/api/students/${studentId}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            showError(
                data.message ||
                "Unable to load student."
            );

            return;

        }


        // Fill form with student data

        fillForm(data.student);


        // Show form

        loading.style.display = "none";

        form.style.display = "block";


    } catch (error) {

        console.error(
            "Error loading student:",
            error
        );

        showError(
            "Unable to connect to the server."
        );

    }

}


// =========================
// Fill Form
// =========================

function fillForm(student) {

    document.getElementById("name").value =
        student.name || "";


    document.getElementById("dateOfBirth").value =
        formatDateForInput(student.dateOfBirth);


    document.getElementById("gender").value =
        student.gender || "";


    document.getElementById("email").value =
        student.email || "";


    document.getElementById("phone").value =
        student.phone || "";


    document.getElementById("alternatePhone").value =
        student.alternatePhone || "";


    document.getElementById("bloodGroup").value =
        student.bloodGroup || "";


    document.getElementById("aadharNumber").value =
        student.aadharNumber || "";


    // Academic

    document.getElementById("registerNumber").value =
        student.registerNumber || "";


    document.getElementById("course").value =
        student.course || "";


    document.getElementById("department").value =
        student.department || "";


    document.getElementById("year").value =
        student.year || "";


    document.getElementById("semester").value =
        student.semester || "";


    document.getElementById("admissionYear").value =
        student.admissionYear || "";


    // Address

    document.getElementById("address").value =
        student.address || "";


    document.getElementById("city").value =
        student.city || "";


    document.getElementById("state").value =
        student.state || "";


    document.getElementById("pincode").value =
        student.pincode || "";


    // Parent / Guardian

    document.getElementById("fatherName").value =
        student.fatherName || "";


    document.getElementById("motherName").value =
        student.motherName || "";


    document.getElementById("parentPhone").value =
        student.parentPhone || "";


    document.getElementById("parentEmail").value =
        student.parentEmail || "";


    // Additional

    document.getElementById("nationality").value =
        student.nationality || "";


    document.getElementById("religion").value =
        student.religion || "";


    document.getElementById("category").value =
        student.category || "";


    document.getElementById("emergencyContact").value =
        student.emergencyContact || "";


    document.getElementById("hostelRequired").checked =
        student.hostelRequired || false;


    document.getElementById("transportRequired").checked =
        student.transportRequired || false;

}


// =========================
// Update Student
// =========================

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        // =========================
        // Collect Updated Data
        // =========================

        const studentData = {

            // Personal

            name:
                document.getElementById("name").value,

            dateOfBirth:
                document.getElementById("dateOfBirth").value,

            gender:
                document.getElementById("gender").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            alternatePhone:
                document.getElementById("alternatePhone").value
                || undefined,

            bloodGroup:
                document.getElementById("bloodGroup").value,

            aadharNumber:
                document.getElementById("aadharNumber").value
                || undefined,


            // Academic

            registerNumber:
                document.getElementById("registerNumber").value,

            course:
                document.getElementById("course").value,

            department:
                document.getElementById("department").value,

            year:
                document.getElementById("year").value,

            semester:
                document.getElementById("semester").value,

            admissionYear:
                document.getElementById("admissionYear").value,


            // Address

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            state:
                document.getElementById("state").value,

            pincode:
                document.getElementById("pincode").value,


            // Parent / Guardian

            fatherName:
                document.getElementById("fatherName").value,

            motherName:
                document.getElementById("motherName").value,

            parentPhone:
                document.getElementById("parentPhone").value,

            parentEmail:
                document.getElementById("parentEmail").value,


            // Additional

            nationality:
                document.getElementById("nationality").value,

            religion:
                document.getElementById("religion").value
                || undefined,

            category:
                document.getElementById("category").value
                || undefined,

            emergencyContact:
                document.getElementById("emergencyContact").value
                || undefined,

            hostelRequired:
                document.getElementById("hostelRequired").checked,

            transportRequired:
                document.getElementById("transportRequired").checked

        };


        // =========================
        // Send PUT Request
        // =========================

        try {

            const response =
                await fetch(
                    `/api/students/${studentId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(studentData)
                    }
                );


            const data =
                await response.json();


            // =========================
            // Handle Response
            // =========================

            if (response.ok) {

                message.textContent =
                    "Student updated successfully!";

                message.style.color =
                    "#15803d";


                // Go back to profile after update

                setTimeout(() => {

                    window.location.href =
                        `/student.html?id=${studentId}`;

                }, 1000);


            } else {

                if (data.errors) {

                    const errorMessages =
                        Object.values(data.errors);

                    message.innerHTML =
                        errorMessages.join("<br>");

                    message.style.color =
                        "#b91c1c";

                } else {

                    message.textContent =
                        data.message ||
                        "Update failed.";

                    message.style.color =
                        "#b91c1c";

                }

            }


        } catch (error) {

            console.error(
                "Update error:",
                error
            );

            message.textContent =
                "Unable to connect to the server.";

            message.style.color =
                "#b91c1c";

        }

    }
);


// =========================
// Format Date for Input
// =========================

function formatDateForInput(date) {

    if (!date) {

        return "";

    }


    const formattedDate =
        new Date(date)
            .toISOString()
            .split("T")[0];


    return formattedDate;

}


// =========================
// Show Error
// =========================

function showError(message) {

    loading.style.display = "none";

    form.style.display = "none";

    errorMessage.textContent =
        message;

    errorMessage.style.display =
        "block";

}


// =========================
// Start
// =========================

loadStudent();