const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    // =========================
    // Personal Details
    // =========================

    name: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"]
    },

    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"]
    },

    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ["Male", "Female", "Other"],
            message: "Invalid gender"
        }
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email address"
        ]
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [
            /^[0-9]{10}$/,
            "Phone number must contain exactly 10 digits"
        ]
    },

    alternatePhone: {
        type: String,
        match: [
            /^[0-9]{10}$/,
            "Alternate phone number must contain exactly 10 digits"
        ]
    },

    bloodGroup: {
        type: String,
        required: [true, "Blood group is required"],
        enum: [
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ]
    },

    aadharNumber: {
        type: String,
        match: [
            /^[0-9]{12}$/,
            "Aadhaar number must contain exactly 12 digits"
        ]
    },


    // =========================
    // Academic Details
    // =========================

    registerNumber: {
        type: String,
        required: [true, "Register number is required"],
        unique: true,
        trim: true
    },

    course: {
        type: String,
        required: [true, "Course is required"]
    },

    department: {
        type: String,
        required: [true, "Department is required"]
    },

    year: {
        type: String,
        required: [true, "Year is required"],
        enum: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ]
    },

    semester: {
        type: String,
        required: [true, "Semester is required"],
        enum: [
            "Semester 1",
            "Semester 2",
            "Semester 3",
            "Semester 4",
            "Semester 5",
            "Semester 6",
            "Semester 7",
            "Semester 8"
        ]
    },

    admissionYear: {
        type: Number,
        required: [true, "Admission year is required"],
        min: [2000, "Invalid admission year"],
        max: [2100, "Invalid admission year"]
    },


    // =========================
    // Address Details
    // =========================

    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },

    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },

    state: {
        type: String,
        required: [true, "State is required"],
        trim: true
    },

    pincode: {
        type: String,
        required: [true, "Pincode is required"],
        match: [
            /^[0-9]{6}$/,
            "Pincode must contain exactly 6 digits"
        ]
    },


    // =========================
    // Parent / Guardian Details
    // =========================

    fatherName: {
        type: String,
        required: [true, "Father's name is required"],
        trim: true
    },

    motherName: {
        type: String,
        required: [true, "Mother's name is required"],
        trim: true
    },

    parentPhone: {
        type: String,
        required: [true, "Parent phone number is required"],
        match: [
            /^[0-9]{10}$/,
            "Parent phone number must contain exactly 10 digits"
        ]
    },

    parentEmail: {
        type: String,
        required: [true, "Parent email is required"],
        trim: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid parent email address"
        ]
    },


    // =========================
    // Additional Details
    // =========================

    nationality: {
        type: String,
        default: "Indian",
        trim: true
    },

    religion: {
        type: String,
        trim: true
    },

    category: {
        type: String,
        enum: [
            "",
            "General",
            "OBC",
            "SC",
            "ST",
            "Other"
        ]
    },

    hostelRequired: {
        type: Boolean,
        default: false
    },

    transportRequired: {
        type: Boolean,
        default: false
    },

    emergencyContact: {
        type: String,
        match: [
            /^[0-9]{10}$/,
            "Emergency contact must contain exactly 10 digits"
        ]
    }

}, {

    timestamps: true

});


module.exports = mongoose.model("Student", studentSchema);