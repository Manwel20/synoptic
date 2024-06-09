const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to handle form data submission
app.post('/submit', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const mode = req.body.mode;
    const data = name + ',' + email + '\n';
    const filePath = 'formData.txt';

    if (mode === 'delete') {
        fs.readFile(filePath, 'utf8', function(err, fileData) {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }
            const lines = fileData.split('\n');
            const filteredLines = lines.filter(function(line) {
                return !line.includes(email);
            });

            if (lines.length === filteredLines.length) {
                return res.status(400).send('Error: Email not in the list.');
            }

            fs.writeFile(filePath, filteredLines.join('\n'), 'utf8', function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server error');
                }
                res.send('Success! Your data has been removed.');
            });
        });
    } else {
        fs.readFile(filePath, 'utf8', function(err, fileData) {
            if (err && err.code !== 'ENOENT') {
                console.error(err);
                return res.status(500).send('Server error');
            }

            const emailExists = fileData.split('\n').some(function(line) {
                return line.includes(email);
            });
            if (emailExists) {
                return res.status(400).send('Error: This email is already in the listing.');
            }

            fs.appendFile(filePath, data, function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server error');
                }
                res.send('Success! Your data has been submitted.');
            });
        });
    }
});

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function() {
    console.log('Server is running on http://localhost:' + PORT);
});