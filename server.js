const express = require("express");
const cors = require("cors");
const db = require("./app/models"); // Importing models

const app = express();

// CORS configuration
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route to serve HTML content
app.get("/", (req, res) => {
  res.send('<h1>Welcome to My Application</h1>');
});

// Database synchronization
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial(); // Call initial function to create roles
}).catch(err => console.error('Database synchronization error:', err));

// Function to initialize roles in the database
function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });

  db.role.create({
    id: 2,
    name: "moderator"
  });

  db.role.create({
    id: 3,
    name: "admin"
  });
}

// Import routes for authentication and authorization
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  // Dynamically import the 'open' package
  import('open').then(open => {
    open.default(`http://localhost:${PORT}`);
  }).catch(err => console.error('Failed to open browser:', err));
});
