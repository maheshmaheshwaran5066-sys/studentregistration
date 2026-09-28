const express = require("express");
const Student = require("../MODELS/student");

const router = express.Router();


// POST - Register a student

router.post("/register", async (req, res) => {

    try {

        const student = new Student(req.body);

        const savedStudent = await student.save();

        res.status(201).json({

            message: "Student registered successfully",

            student: savedStudent

        });

    } catch (error) {

        // Duplicate email or register number

        if (error.code === 11000) {

            const field = Object.keys(error.keyPattern)[0];

            return res.status(400).json({

                message: `${field} already exists`

            });

        }


        // Mongoose validation error

        if (error.name === "ValidationError") {

            const errors = {};

            for (const field in error.errors) {

                errors[field] =
                    error.errors[field].message;

            }

            return res.status(400).json({

                message: "Validation failed",

                errors: errors

            });

        }


        // Other server errors

        res.status(500).json({

            message: "Internal server error",

            error: error.message

        });

    }

});



// GET - Get all students

router.get("/", async (req, res) => {

    try {

        const students = await Student.find();

        res.status(200).json({
            message: "Students retrieved successfully",
            students: students
        });

    } catch (error) {

        res.status(500).json({
            message: "Error retrieving students",
            error: error.message
        });

    }

});


// GET - Get a single student by ID

router.get("/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.status(200).json({
            message: "Student retrieved successfully",
            student: student
        });

    } catch (error) {

        res.status(500).json({
            message: "Error retrieving student",
            error: error.message
        });

    }

});


// PUT - Update a student

router.put("/:id", async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.status(200).json({

            message: "Student updated successfully",

            student: updatedStudent

        });

    } catch (error) {

        // Duplicate email or register number

        if (error.code === 11000) {

            const field = Object.keys(error.keyPattern)[0];

            return res.status(400).json({

                message: `${field} already exists`

            });

        }


        // Mongoose validation error

        if (error.name === "ValidationError") {

            const errors = {};

            for (const field in error.errors) {

                errors[field] =
                    error.errors[field].message;

            }

            return res.status(400).json({

                message: "Validation failed",

                errors: errors

            });

        }


        // Invalid MongoDB ID

        if (error.name === "CastError") {

            return res.status(400).json({

                message: "Invalid student ID"

            });

        }


        // Other server errors

        res.status(500).json({

            message: "Internal server error",

            error: error.message

        });

    }

});

// DELETE - Delete a student

router.delete("/:id", async (req, res) => {

    try {

        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deletedStudent) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting student",
            error: error.message
        });

    }

});


// ===============================
// Export Router
// ===============================

module.exports = router;