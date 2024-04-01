const express = require('express');
const multer = require('multer');
const worker = require('./worker/worker');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'datasheet.csv'); // Fixed filename for all uploads
    }
});

const upload = multer({ storage: storage });

// Route for CSV upload
app.post("/upload", upload.single("datasheet"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("Bad Request: CSV file missing from payload");
        }
        
        const filePath = req.file.path;
        
        // Call worker thread to process CSV
        await worker.processCSV(filePath);
        
        res.status(200).json({"Status": 200, "Message": "File have been uploaded; worker adding it in mongoDB"})
    } catch (err) {
        console.error("Error processing CSV:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});