// =========================
// Get Student ID from URL
// =========================

const urlParams = new URLSearchParams(window.location.search);

const studentId = urlParams.get("id");


// =========================
// HTML Elements
// =========================

const loading =
    document.getElementById("loading");

const profileContent =
    document.getElementById("profileContent");

const errorMessage =
    document.getElementById("errorMessage");

const editBtn =
    document.getElementById("editBtn");


// =========================
// Load Student
// =========================

async function loadStudent() {

    // Check if ID exists

    if (!studentId) {

        showError("Student ID is missing.");

        return;

    }


    try {

        const response = await fetch(
            `/api/students/${studentId}`
        );


        const data = await response.json();


        // =========================
        // Handle API Error
        // =========================

        if (!response.ok) {

            showError(
                data.message ||
                "Unable to load student."
            );

            return;

        }


        // =========================
        // Display Student
        // =========================

        const student = data.student;

        displayStudent(student);


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
// Display Student
// =========================

function displayStudent(student) {


    // =========================
    // Header
    // =========================

    document.getElementById("studentName").textContent =
        student.name || "—";


    document.getElementById("studentRegister").textContent =
        `Register Number: ${student.registerNumber || "—"}`;


    // =========================
    // Personal Details
    // =========================

    document.getElementById("name").textContent =
        student.name || "—";


    document.getElementById("dateOfBirth").textContent =
        formatDate(student.dateOfBirth);


    document.getElementById("gender").textContent =
        student.gender || "—";


    document.getElementById("email").textContent =
        student.email || "—";


    document.getElementById("phone").textContent =
        student.phone || "—";


    document.getElementById("alternatePhone").textContent =
        student.alternatePhone || "—";


    document.getElementById("bloodGroup").textContent =
        student.bloodGroup || "—";


    document.getElementById("aadharNumber").textContent =
        student.aadharNumber || "—";


    // =========================
    // Academic Details
    // =========================

    document.getElementById("registerNumber").textContent =
        student.registerNumber || "—";


    document.getElementById("course").textContent =
        student.course || "—";


    document.getElementById("department").textContent =
        student.department || "—";


    document.getElementById("year").textContent =
        student.year || "—";


    document.getElementById("semester").textContent =
        student.semester || "—";


    document.getElementById("admissionYear").textContent =
        student.admissionYear || "—";


    // =========================
    // Address Details
    // =========================

    document.getElementById("address").textContent =
        student.address || "—";


    document.getElementById("city").textContent =
        student.city || "—";


    document.getElementById("state").textContent =
        student.state || "—";


    document.getElementById("pincode").textContent =
        student.pincode || "—";


    // =========================
    // Parent / Guardian
    // =========================

    document.getElementById("fatherName").textContent =
        student.fatherName || "—";


    document.getElementById("motherName").textContent =
        student.motherName || "—";


    document.getElementById("parentPhone").textContent =
        student.parentPhone || "—";


    document.getElementById("parentEmail").textContent =
        student.parentEmail || "—";


    // =========================
    // Additional Information
    // =========================

    document.getElementById("nationality").textContent =
        student.nationality || "—";


    document.getElementById("religion").textContent =
        student.religion || "—";


    document.getElementById("category").textContent =
        student.category || "—";


    document.getElementById("emergencyContact").textContent =
        student.emergencyContact || "—";


    document.getElementById("hostelRequired").textContent =
        student.hostelRequired ? "Yes" : "No";


    document.getElementById("transportRequired").textContent =
        student.transportRequired ? "Yes" : "No";


    // =========================
    // System Information
    // =========================

    document.getElementById("studentId").textContent =
        student._id || "—";


    document.getElementById("createdAt").textContent =
        formatDateTime(student.createdAt);


    document.getElementById("updatedAt").textContent =
        formatDateTime(student.updatedAt);


    // =========================
    // Edit Button
    // =========================

    editBtn.addEventListener("click", () => {

        window.location.href =
            `/edit-student.html?id=${student._id}`;

    });


    // =========================
    // Show Profile
    // =========================

    loading.style.display = "none";

    profileContent.style.display = "block";

}


// =========================
// Format Date
// =========================

function formatDate(date) {

    if (!date) {

        return "—";

    }


    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


// =========================
// Format Date + Time
// =========================

function formatDateTime(date) {

    if (!date) {

        return "—";

    }


    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",

            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// =========================
// Show Error
// =========================

function showError(message) {

    loading.style.display = "none";

    profileContent.style.display = "none";

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

}


// =========================
// Start
// =========================

loadStudent();