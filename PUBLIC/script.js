const form = document.getElementById("studentForm");
const message = document.getElementById("message");


form.addEventListener("submit", async (event) => {

    event.preventDefault();


    // =========================
    // Collect Form Data
    // =========================

    const studentData = {

        // =========================
        // Personal Details
        // =========================

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
            document.getElementById("alternatePhone").value || undefined,

        bloodGroup:
            document.getElementById("bloodGroup").value,

        aadharNumber:
            document.getElementById("aadharNumber").value || undefined,


        // =========================
        // Academic Details
        // =========================

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


        // =========================
        // Address Details
        // =========================

        address:
            document.getElementById("address").value,

        city:
            document.getElementById("city").value,

        state:
            document.getElementById("state").value,

        pincode:
            document.getElementById("pincode").value,


        // =========================
        // Parent / Guardian Details
        // =========================

        fatherName:
            document.getElementById("fatherName").value,

        motherName:
            document.getElementById("motherName").value,

        parentPhone:
            document.getElementById("parentPhone").value,

        parentEmail:
            document.getElementById("parentEmail").value,


        // =========================
        // Additional Details
        // =========================

        nationality:
            document.getElementById("nationality").value,

        religion:
            document.getElementById("religion").value || undefined,

        category:
            document.getElementById("category").value || undefined,

        emergencyContact:
            document.getElementById("emergencyContact").value || undefined,

        hostelRequired:
            document.getElementById("hostelRequired").checked,

        transportRequired:
            document.getElementById("transportRequired").checked

    };


    // =========================
    // Send Data to Backend
    // =========================

    try {

        const response = await fetch(
            "/api/students/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(studentData)
            }
        );


        const data = await response.json();


        // =========================
        // Handle Response
        // =========================

        if (response.ok) {

            message.textContent =
                "Student registered successfully!";

            form.reset();

        } else {

            // =========================
            // Validation Errors
            // =========================

            if (data.errors) {

                const errorMessages =
                    Object.values(data.errors);

                message.innerHTML =
                    errorMessages.join("<br>");

            } else {

                message.textContent =
                    data.message ||
                    "Registration failed.";

            }

        }

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        message.textContent =
            "Unable to connect to the server.";

    }

});