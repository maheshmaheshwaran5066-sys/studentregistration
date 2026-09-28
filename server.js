const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const studentRoutes = require("./ROUTES/studentRoutes");

dotenv.config();

const app = express();


// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ===============================
// Frontend
// ===============================

app.use(express.static("PUBLIC"));


// ===============================
// Routes
// ===============================

app.use("/api/students", studentRoutes);


// ===============================
// MongoDB Connection
// ===============================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });


// ===============================
// Server
// ===============================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});