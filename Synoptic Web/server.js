
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to handle form data submission
app.post('/submit', (req, res) => {
    const { name, number } = req.body;

    // Append data to the text file
    const data = `${name},${number}\n`;
    fs.appendFile('formData.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.send('Success!');
    });
});

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
