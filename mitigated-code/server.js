const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Use the bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// Serve the HTML page with the form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/set-cookie', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Validate username and password (in a real application, you would do more secure validation)
  if (username === 'Gordon.Craigie' && password === 'Gordon.blog.pass#') {
      // Set a cookie containing the username and password for the index page
      res.cookie('user', JSON.stringify({ username, password }));

      // Redirect to the index page with the cookie set
      res.redirect('/index');
  } else {
      res.redirect('/login');
  }
});

app.get('/data', (req, res) => {
    // Read the JSON data from the file
    const data = fs.readFileSync('data.json', 'utf8');
  
    // Parse the JSON data into an array
    const dataArray = JSON.parse(data);
  
    // Send the JSON data back to the client
    res.send(dataArray);
  });
// Handle the form submission
app.post('/submit', (req, res) => {
    // Get the form data
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
  
    // Read the existing JSON data from the file
    const existingData = fs.readFileSync('data.json', 'utf8');
  
    // Parse the existing JSON data into an array or create a new empty array
    const dataArray = existingData ? JSON.parse(existingData) : [];
  
    // Create a new object with the form data
    const data = {
      name: name,
      email: email,
      message: message
    };
  
    // Add the new data to the array
    dataArray.push(data);
  
    // Serialize the updated data array to JSON
    const updatedDataJson = JSON.stringify(dataArray, null, 2);
  
    // Add opening and closing brackets to the JSON data
    const finalJson = `${updatedDataJson}`;
  
    // Write the updated JSON data back to the file
    fs.writeFileSync('data.json', finalJson);
  
    // Redirect the user back to the form page
    res.redirect('/index');
  });



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

