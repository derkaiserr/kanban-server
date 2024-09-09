const sqlite3 = require('sqlite3').verbose();

// Connect to the database
let db = new sqlite3.Database('./db/tasks.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the tasks database.');
});

// Create the 'tasks' table
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL,   -- Changed from INTEGER to TEXT for descriptive status
    task TEXT NOT NULL,
    tags TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Tasks table created");
});

module.exports = db;
